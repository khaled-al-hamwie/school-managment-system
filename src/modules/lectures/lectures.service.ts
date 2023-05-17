import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { addTimes } from "src/core/common/transformers/addTimes.transform";
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

    async addLectures(
        start_time: LectureAttributes["start_time"],
        lecture_length: number,
        schedule_day_id: LectureAttributes["schedule_day_id"],
        rests: number[]
    ) {
        let time = start_time;
        for (
            let lecture_number = 0;
            lecture_number < lecture_length;
            lecture_number++
        ) {
            await this.create({
                schedule_day_id,
                start_time: time,
                lecture_number: lecture_number + 1,
            });
            time = addTimes(time, "00:45");
            if (rests.includes(lecture_number)) {
                await this.create({
                    schedule_day_id,
                    start_time: time,
                    is_rest: true,
                });
                time = addTimes(time, "00:15");
            }
        }
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
