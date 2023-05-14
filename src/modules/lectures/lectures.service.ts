import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { CreateLectureDto } from "./dto/create-lecture.dto";
import { UpdateLectureDto } from "./dto/update-lecture.dto";
import { Lecture } from "./entities/lecture.entity";
import { LectureAttributes } from "./interfaces/lecture.interface";

@Injectable()
export class LecturesService {
    constructor(
        @InjectModel(Lecture) private readonly LectureEntity: typeof Lecture
    ) {}
    async create(createLectureDto: CreateLectureDto) {
        await this.LectureEntity.create(createLectureDto);
    }

    findAll() {
        return `This action returns all lectures`;
    }

    findOne(options: WhereOptions<LectureAttributes>) {
        return this.LectureEntity.findOne({
            where: options,
            limit: 1,
        });
    }

    update(id: number, updateLectureDto: UpdateLectureDto) {
        return `This action updates a #${id} lecture`;
    }

    remove(id: number) {
        return `This action removes a #${id} lecture`;
    }

    async checkLecture(lecture_id: LectureAttributes["lecture_id"]) {
        const lecture = await this.findOne({
            lecture_id,
        });
        if (!lecture) throw new NotFoundException("Lecture doesn't exists");
        return lecture;
    }
}
