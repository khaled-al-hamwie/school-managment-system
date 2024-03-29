import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions, WhereOptions } from "sequelize";
import { SubjectAttributes } from "../subjects/interfaces/subject.interface";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { TeachersService } from "../teachers/teachers.service";
import { Teach } from "./entities/teach.entity";
import { TeachAttributes } from "./interfaces/teach.interface";

@Injectable()
export class TeachesService {
    constructor(
        @InjectModel(Teach) private readonly TeachEntity: typeof Teach,
        private readonly teachersService: TeachersService,
    ) {}
    async create(
        subject_id: SubjectAttributes["subject_id"],
        teacher_ids: TeacherAttributes["teacher_id"][],
    ) {
        for (let i = 0; i < teacher_ids.length; i++) {
            const teacher_id = teacher_ids[i];
            const teacher = await this.teachersService.findOne({
                where: { teacher_id },
            });
            if (teacher && (await this.teachNotExist(subject_id, teacher_id)))
                await this.TeachEntity.create({ subject_id, teacher_id });
        }
    }
    findAll(options?: FindOptions<TeachAttributes>) {
        return this.TeachEntity.findAll(options);
    }
    findOne(options: WhereOptions<TeachAttributes>) {
        return this.TeachEntity.findOne({
            where: options,
            limit: 1,
        });
    }

    remove(options: WhereOptions<TeachAttributes>) {
        return this.TeachEntity.destroy({ where: options });
    }

    async teachNotExist(
        subject_id: SubjectAttributes["subject_id"],
        teacher_id: TeacherAttributes["teacher_id"],
    ) {
        return (await this.findOne({ subject_id, teacher_id })) == null;
    }

    async checkTeach(teach_id: TeachAttributes["teach_id"]) {
        const teach = await this.findOne({ teach_id });
        if (!teach)
            throw new NotFoundException(`teach with ${teach_id} does'nt exist`);
        return teach;
    }
}
