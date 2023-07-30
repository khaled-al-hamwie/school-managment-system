import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
import { saveModel } from "src/core/common/transformers/modelSave";
import { Exam } from "../exams/entities/exam.entity";
import { Record } from "../records/entities/record.entity";
import { RecordsService } from "../records/records.service";
import Student from "../students/entities/student.entity";
import { StudentAttributes } from "../students/interfaces/student.interface";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { Teach } from "../teaches/entities/teach.entity";
import { TeachAttributes } from "../teaches/interfaces/teach.interface";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { PutGradeDto } from "./dto/put-grade.dto";
import { Grade } from "./entities/grade.entity";
import { GradeAttributes } from "./interfaces/grade.interface";

@Injectable()
export class GradesService {
    constructor(
        @InjectModel(Grade) private readonly GradeEntity: typeof Grade,
        private readonly recordsService: RecordsService,
    ) {}

    async create(createGradeDto: CreateGradeDto) {
        const records = await this.recordsService.findAll({
            where: { class_id: createGradeDto.class_id },
        });
        records.forEach(async (record) => {
            await this.GradeEntity.create({
                exam_id: createGradeDto.exam_id,
                record_id: record.record_id,
            });
        });
    }

    findAll(options: FindOptions<GradeAttributes>) {
        return this.GradeEntity.findAll(options);
    }

    findForTeacher(
        exam_id: GradeAttributes["exam_id"],
        teacher_id: TeachAttributes["teach_id"],
    ) {
        return this.findAll({
            where: { exam_id, "$exam.teach.teacher_id$": teacher_id },
            include: [
                { model: Exam, include: [{ model: Teach }] },
                { model: Record, include: [{ model: Student }] },
            ],
        });
    }
    findForStudent(student_id: StudentAttributes["student_id"]) {
        return this.findAll({
            where: { "$record.student_id$": student_id, checked: true },
            include: [{ model: Record }, { model: Exam }],
        });
    }
    async put(
        id: GradeAttributes["grade_id"],
        putGradeDto: PutGradeDto,
        teacher_id: TeacherAttributes["teacher_id"],
    ) {
        const grade = await this.GradeEntity.findOne({
            where: { grade_id: id, "$exam.teach.teacher_id$": teacher_id },
            include: [{ model: Exam, include: [{ model: Teach }] }],
        });
        if (!grade) {
            throw new NotFoundException("grade doesn't exists");
        }
        grade.update(putGradeDto).then(saveModel);
        return "done";
    }
}
