import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RecordsService } from "../records/records.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./entities/grade.entity";

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

    findAll() {
        return `This action returns all grades`;
    }

    findOne(id: number) {
        return `This action returns a #${id} grade`;
    }

    update(id: number, updateGradeDto: UpdateGradeDto) {
        return `This action updates a #${id} grade`;
    }

    remove(id: number) {
        return `This action removes a #${id} grade`;
    }
}
