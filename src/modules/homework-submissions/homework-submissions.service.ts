import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { HomeworksService } from "../homeworks/homeworks.service";
import { Record } from "../records/entities/record.entity";
import { StudentsService } from "../students/students.service";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework-submission.dto";
import { HomeworkSubmission } from "./entities/homework-submission.entity";

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
        console.info(student.records[0].record_id);
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

    findAll() {
        return `This action returns all homeworkSubmissions`;
    }

    findOne(id: number) {
        return `This action returns a #${id} homeworkSubmission`;
    }
}
