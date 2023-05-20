import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { addTimes } from "src/core/common/transformers/addTimes.transform";
import { saveModel } from "src/core/common/transformers/modelSave";
import { TeachesService } from "../teaches/teaches.service";
import { CreateLectureDto } from "./dto/create-lecture.dto";
import { UpdateLectureDto } from "./dto/update-lecture.dto";
import { UpdateLecturesDto } from "./dto/update-lectures.dto";
import { Lecture } from "./entities/lecture.entity";
import { LectureAttributes } from "./interfaces/lecture.interface";

@Injectable()
export class LecturesService {
    constructor(
        @InjectModel(Lecture) private readonly LectureEntity: typeof Lecture,
        private readonly teachesService: TeachesService
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

    async update(lecture: Lecture, updateLectureDto: UpdateLectureDto) {
        await lecture.update(updateLectureDto).then(saveModel);
    }

    async updateLectures(body: UpdateLecturesDto) {
        for (let i = 0; i < body.lectures.length; i++) {
            const lec = body.lectures[i];
            const lecture = await this.findOne({
                lecture_number: lec.lecture_number,
                schedule_day_id: body.schedule_day_id,
            });
            if (lec.teach_id == 0) {
                this.update(lecture, { teach_id: null });
            } else {
                this.update(lecture, { teach_id: lec.teach_id });
            }
        }
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
