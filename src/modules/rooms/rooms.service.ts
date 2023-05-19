import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import { saveModel } from "src/core/common/transformers/modelSave";
import { ClassesService } from "../classes/classes.service";
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
        updateRoomDto: UpdateRoomDto
    ) {
        const room = await this.checkRoom(room_id);
        if (updateRoomDto.class_id)
            await this.classessService.checkClass(updateRoomDto.class_id);
        room.update(updateRoomDto).then(saveModel);
        this.schedulesService.update(room_id, updateRoomDto.name);
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
