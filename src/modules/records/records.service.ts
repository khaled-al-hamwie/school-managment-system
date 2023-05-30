import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { StudentsService } from "../students/students.service";
import { Record } from "./entities/record.entity";
import { RecordAttributes } from "./interfaces/record.interface";

@Injectable()
export class RecordsService {
    constructor(
        @InjectModel(Record) private readonly RecordEntity: typeof Record,
        private readonly studentsService: StudentsService
    ) {}
    async create(
        class_id: RecordAttributes["class_id"],
        student_ids: RecordAttributes["student_id"][]
    ) {
        const year = `${new Date().getFullYear()}/${
            new Date().getFullYear() + 1
        }`;
        for (let i = 0; i < student_ids.length; i++) {
            const student_id = student_ids[i];
            const student = await this.studentsService.findOne({
                where: { student_id },
            });
            if (
                student &&
                (await this.recordNotExist(class_id, student_id, year))
            )
                await this.RecordEntity.create({ class_id, student_id, year });
        }
    }

    findAll() {
        return `This action returns all records`;
    }

    findOne(options: WhereOptions<RecordAttributes>) {
        return this.RecordEntity.findOne({
            where: options,
            limit: 1,
        });
    }

    async recordNotExist(
        class_id: RecordAttributes["class_id"],
        student_id: RecordAttributes["student_id"],
        year: RecordAttributes["year"]
    ) {
        return (await this.findOne({ class_id, student_id, year })) == null;
    }

    update() {
        return `This action updates a  record`;
    }

    remove(id: number) {
        return `This action removes a #${id} record`;
    }
}
