import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { GradesService } from "../grades/grades.service";
import { SubjectsService } from "../subjects/subjects.service";
import { TeachesService } from "../teaches/teaches.service";
import { CreateExamDto } from "./dto/create-exam.dto";
import { FindAllExamDto } from "./dto/findAll-exam.dto";
import { Exam } from "./entities/exam.entity";

@Injectable()
export class ExamsService {
    constructor(
        @InjectModel(Exam) private readonly ExamEntity: typeof Exam,
        private readonly teachService: TeachesService,
        private readonly subjectService: SubjectsService,
        private readonly gradesService: GradesService,
    ) {}
    async create(createExamDto: CreateExamDto) {
        const teach = await this.teachService.findOne({
            subject_id: createExamDto.subject_id,
            teacher_id: createExamDto.teacher_id,
        });
        if (!teach)
            throw new NotFoundException("teacher doesn't teache the subject");
        const subject = await this.subjectService.findOne({
            subject_id: createExamDto.subject_id,
        });
        if (subject.class_id !== createExamDto.class_id)
            throw new ForbiddenException("subject is not taught to this room");
        delete createExamDto["subject_id"];
        delete createExamDto["teacher_id"];
        const exam = await this.ExamEntity.create({
            ...createExamDto,
            teach_id: teach.teach_id,
        });
        this.gradesService.create({
            class_id: createExamDto.class_id,
            exam_id: exam.exam_id,
        });
        return "done";
    }

    async findAll(dto: FindAllExamDto) {
        const teaches = await this.teachService.findAll({
            where: {
                teacher_id: dto.teacher_id,
                subject_id: dto.subject_id ? dto.subject_id : { [Op.ne]: null },
            },
        });
        const teaches_id = teaches.map((teach) => teach.teach_id);
        return this.ExamEntity.findAll({
            where: {
                teach_id: { [Op.in]: teaches_id },
                class_id: dto.class_id ? dto.class_id : { [Op.ne]: null },
            },
        });
    }
}
