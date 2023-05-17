import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { WhereOptions } from "sequelize";
import { ClassesService } from "../classes/classes.service";
import { CreateScheduleDto } from "../schedules/dto/create-schedule.dto";
import { SchedulesService } from "../schedules/schedules.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./entities/room.entity";
import { RoomAttributes } from "./interfaces/room.interface";

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room) private readonly RoomEntity: typeof Room,
        private readonly classessService: ClassesService,
        private readonly schedulesService: SchedulesService
    ) {}

    async create(createRoomDto: CreateRoomDto) {
        await this.classessService.checkClass(createRoomDto.class_id);
        const {
            class_id,
            days,
            lecture_number,
            name,
            rests,
            school_start,
            student_count,
        } = createRoomDto;
        const room = await this.RoomEntity.create({
            class_id,
            name,
            student_count,
        });
        this.schedulesService.create(room.room_id, name, {
            days,
            lecture_number,
            rests,
            school_start,
        });
        return "done";
    }

    findOne(options: WhereOptions<RoomAttributes>) {
        return this.RoomEntity.findOne({
            where: options,
            limit: 1,
        });
    }

    async update(
        room_id: RoomAttributes["room_id"],
        updateClassDto: UpdateRoomDto
    ) {
        const room = await this.checkRoom(room_id);
        if (updateClassDto.class_id)
            await this.classessService.checkClass(updateClassDto.class_id);
        room.update(updateClassDto).then((output) => output.save());
        return "done";
    }

    async checkRoom(room_id: RoomAttributes["room_id"]) {
        const room = await this.findOne({
            room_id,
        });
        if (!room) throw new NotFoundException("Room doesn't exists");
        return room;
    }
}
