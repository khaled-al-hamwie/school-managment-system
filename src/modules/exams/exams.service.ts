import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RoomsService } from "../rooms/rooms.service";
import { SubjectsService } from "../subjects/subjects.service";
import { TeachesService } from "../teaches/teaches.service";
import { CreateExamDto } from "./dto/create-exam.dto";
import { Exam } from "./entities/exam.entity";

@Injectable()
export class ExamsService {
    constructor(
        @InjectModel(Exam) private readonly ExamEntity: typeof Exam,
        private readonly roomsService: RoomsService,
        private readonly teachService: TeachesService,
        private readonly subjectService: SubjectsService,
    ) {}
    async create(createExamDto: CreateExamDto) {
        const room = await this.roomsService.checkRoom(createExamDto.room_id);
        const teach = await this.teachService.findOne({
            subject_id: createExamDto.subject_id,
            teacher_id: createExamDto.teacher_id,
        });
        if (!teach)
            throw new NotFoundException("teacher doesn't teache the subject");
        const subject = await this.subjectService.findOne({
            subject_id: createExamDto.subject_id,
        });
        if (subject.class_id !== room.class_id)
            throw new ForbiddenException("subject is not taught to this room");
        delete createExamDto["subject_id"];
        delete createExamDto["teacher_id"];
        this.ExamEntity.create({
            ...createExamDto,
            teach_id: teach.teach_id,
        });

        return "done";
    }

    findAll() {
        return `This action returns all exams`;
    }
}
