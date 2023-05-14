import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RoomsService } from "../rooms/rooms.service";
import { CreateLectureDto } from "./dto/create-lecture.dto";
import { UpdateLectureDto } from "./dto/update-lecture.dto";
import { Lecture } from "./entities/lecture.entity";
import { LectureAttributes } from "./interfaces/lecture.interface";

@Injectable()
export class LecturesService {
    constructor(
        @InjectModel(Lecture) private readonly LectureEntity: typeof Lecture,
        private readonly roomsService: RoomsService
    ) {}
    create(
        room_id: LectureAttributes["room_id"],
        createLectureDto: CreateLectureDto
    ) {
        // check if a room exists in the rooms and not in the lectures
        // get the lecture length and the rest length
        // starting from the start of the day iterate over the days and then for each day iterate over the periods
        // and check if it is rest and if it is a teach lecture , and don't forget to check if the lecture exists
        return "This action adds a new lecture";
    }

    findAll() {
        return `This action returns all lectures`;
    }

    findOne(id: number) {
        return `This action returns a #${id} lecture`;
    }

    update(id: number, updateLectureDto: UpdateLectureDto) {
        return `This action updates a #${id} lecture`;
    }

    remove(id: number) {
        return `This action removes a #${id} lecture`;
    }
}
