import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
import { saveModel } from "src/core/common/transformers/modelSave";
import { Homework } from "../homeworks/entities/homework.entity";
import { HomeworksService } from "../homeworks/homeworks.service";
import { Record } from "../records/entities/record.entity";
import { Room } from "../rooms/entities/room.entity";
import Student from "../students/entities/student.entity";
import { StudentAttributes } from "../students/interfaces/student.interface";
import { StudentsService } from "../students/students.service";
import { Subject } from "../subjects/entities/subject.entity";
import Teacher from "../teachers/entities/teacher.entity";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { Teach } from "../teaches/entities/teach.entity";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework-submission.dto";
import { PutHomeworkSubmissionDto } from "./dto/put-homework-submission.dto";
import { HomeworkSubmission } from "./entities/homework-submission.entity";
import { HomeworkSubmissionAttributes } from "./interfaces/homework-submission.interface";

@Injectable()
export class HomeworkSubmissionsService {
    constructor(
        @InjectModel(HomeworkSubmission)
        private readonly homeworksSubmissionEntity: typeof HomeworkSubmission,
        private readonly studentsService: StudentsService,
        private readonly homeworksService: HomeworksService,
    ) {}
    async create(createHomeworkSubmissionDto: CreateHomeworkSubmissionDto) {
        const student = await this.studentsService.findOne({
            where: { student_id: createHomeworkSubmissionDto.student_id },
            include: [{ model: Record, order: [["year", "DESC"]] }],
        });
        if (!student.room_id) {
            throw new ForbiddenException("student not assing to a room yet");
        }
        const homework = await this.homeworksService.findOne({
            homework_id: createHomeworkSubmissionDto.homework_id,
            room_id: student.room_id,
        });
        if (!homework) {
            throw new NotFoundException("Homework doesn't exists");
        }

        if (new Date(homework.deadline_date) <= new Date()) {
            throw new ForbiddenException(
                "you are late, you can't submite after the deadline",
            );
        }
        this.homeworksSubmissionEntity.create({
            record_id: student.records[0].record_id,
            homework_id: createHomeworkSubmissionDto.homework_id,
            drive_link: createHomeworkSubmissionDto.drive_link,
        });
        return "done";
    }

    findAll(options: FindOptions<HomeworkSubmissionAttributes>) {
        return this.homeworksSubmissionEntity.findAll(options);
    }

    async findStudentSubmission(student_id: StudentAttributes["student_id"]) {
        const student = await this.studentsService.findOne({
            where: { student_id },
            include: [{ model: Record, order: [["year", "DESC"]] }],
        });
        return this.findAll({
            where: { record_id: student.records[0].record_id },
            attributes: { exclude: ["grade", "is_checked"] },
            include: [
                {
                    model: Homework,
                    include: [
                        {
                            model: Teach,
                            include: [
                                { model: Subject },
                                {
                                    model: Teacher,
                                    attributes: [
                                        "teacher_id",
                                        "first_name",
                                        "last_name",
                                        "middle_name",
                                        "gender",
                                        "birth_day",
                                        "phone_number",
                                        "nationality",
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }

    findHomewordSubmission(
        homework_id: HomeworkSubmissionAttributes["homework_id"],
        teacher_id: TeacherAttributes["teacher_id"],
    ) {
        return this.findAll({
            where: { homework_id, "$homework.teach.teacher_id$": teacher_id },
            include: [
                {
                    model: Homework,
                    include: [
                        {
                            model: Teach,
                            include: [{ model: Subject }],
                        },
                        {
                            model: Room,
                        },
                    ],
                },
                {
                    model: Record,
                    include: [{ model: Student }],
                },
            ],
        });
    }

    async put(
        homework_submission_id: HomeworkSubmissionAttributes["homework_id"],
        putHomeworkSubmissionDto: PutHomeworkSubmissionDto,
    ) {
        const homework_submission =
            await this.homeworksSubmissionEntity.findOne({
                where: {
                    homework_submission_id,
                    "$homework.teach.teacher_id$":
                        putHomeworkSubmissionDto.teacher_id,
                },
                include: [
                    {
                        model: Homework,
                        include: [
                            {
                                model: Teach,
                            },
                        ],
                    },
                ],
            });
        if (!homework_submission) {
            throw new NotFoundException("homework submission doesn't existst");
        }
        homework_submission.update(putHomeworkSubmissionDto).then(saveModel);
        return "done";
    }
}
