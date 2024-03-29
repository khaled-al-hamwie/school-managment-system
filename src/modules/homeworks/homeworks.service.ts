import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, WhereOptions } from "sequelize";
import { RoomsService } from "../rooms/rooms.service";
import { StudentAttributes } from "../students/interfaces/student.interface";
import { StudentsService } from "../students/students.service";
import { Subject } from "../subjects/entities/subject.entity";
import Teacher from "../teachers/entities/teacher.entity";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { Teach } from "../teaches/entities/teach.entity";
import { TeachesService } from "../teaches/teaches.service";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { FindAllHomeworkDto } from "./dto/findAll-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { Homework } from "./entities/homework.entity";
import { HomeworkAttributes } from "./interfaces/homework.interface";

@Injectable()
export class HomeworksService {
    constructor(
        @InjectModel(Homework) private readonly HomeworkEntity: typeof Homework,
        private readonly roomsService: RoomsService,
        private readonly teachService: TeachesService,
        private readonly studentService: StudentsService,
    ) {}

    async create(createHomeworkDto: CreateHomeworkDto) {
        await this.roomsService.checkRoom(createHomeworkDto.room_id);
        const teach = await this.teachService.findOne({
            subject_id: createHomeworkDto.subject_id,
            teacher_id: createHomeworkDto.teacher_id,
        });
        if (!teach)
            throw new NotFoundException("teacher doesn't teache the subject");
        delete createHomeworkDto["subject_id"];
        delete createHomeworkDto["teacher_id"];
        this.HomeworkEntity.create({
            ...createHomeworkDto,
            teach_id: teach.teach_id,
        });

        return "done";
    }

    async findAll(
        query: FindAllHomeworkDto,
        teacher_id: TeacherAttributes["teacher_id"],
        page = 0,
    ) {
        const whereOptions: WhereOptions<HomeworkAttributes> = {};
        for (const key in query) {
            if (Object.prototype.hasOwnProperty.call(query, key)) {
                whereOptions[key] = { [Op.regexp]: query[key] };
            }
        }
        return await this.HomeworkEntity.findAll({
            where: whereOptions,
            attributes: { exclude: ["teach_id"] },
            offset: page * 5,
            limit: 5,
            order: [["deadline_date", "ASC"]],
            include: [{ model: Teach, where: { teacher_id } }],
        });
    }

    async findOne(options: WhereOptions<HomeworkAttributes>) {
        return this.HomeworkEntity.findOne({
            where: options,
            limit: 1,
        });
    }

    async update(
        homework_id: HomeworkAttributes["homework_id"],
        updateHomeworkDto: UpdateHomeworkDto,
    ) {
        let updatedDto = updateHomeworkDto;
        const homework = await this.findOne({ homework_id });
        if (!homework)
            throw new NotFoundException("this homework doesn't exist");
        if (updateHomeworkDto.room_id)
            await this.roomsService.checkRoom(updateHomeworkDto.room_id);
        if (updateHomeworkDto.subject_id) {
            const teach = await this.teachService.findOne({
                subject_id: updateHomeworkDto.subject_id,
                teacher_id: updateHomeworkDto.teacher_id,
            });
            if (!teach)
                throw new NotFoundException(
                    "teacher doesn't teache the subject",
                );
            delete updateHomeworkDto["subject_id"];
            delete updateHomeworkDto["teacher_id"];
            updatedDto["teach_id"] = teach.teach_id;
        }
        homework.update(updatedDto).then((output) => output.save());
        return "done";
    }
    async findStudentHomeworks(student_id: StudentAttributes["student_id"]) {
        const room_id = (
            await this.studentService.findOne({ where: { student_id } })
        ).room_id;
        if (!room_id) {
            throw new ForbiddenException("student is not assign to a room yet");
        }
        return this.HomeworkEntity.findAll({
            where: { room_id },
            include: [
                {
                    model: Teach,
                    include: [
                        {
                            model: Teacher,
                            attributes: {
                                exclude: [
                                    "salary",
                                    "birth_day",
                                    "phone_number",
                                    "location",
                                    "nationality",
                                ],
                            },
                        },
                        {
                            model: Subject,
                        },
                    ],
                },
            ],
        });
    }
}
