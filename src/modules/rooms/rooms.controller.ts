import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { ROOM_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import { Class } from "../classes/entities/class.entity";
import { Group } from "../groups/entities/group.entity";
import { Schedule } from "../schedules/entities/schedule.entity";
import Student from "../students/entities/student.entity";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { RoomAttributes } from "./interfaces/room.interface";
import { RoomsService } from "./rooms.service";

@ApiTags(ROOM_TAG, WEB_TAG)
@Controller("rooms")
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(createRoomDto);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll() {
        return this.roomsService.findAll({
            include: [{ model: Class }, { model: Schedule }],
        });
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) room_id: RoomAttributes["room_id"],
    ) {
        const room = await this.roomsService.findOne({
            where: { room_id },
            include: [
                { model: Class },
                { model: Schedule },
                { model: Student },
                { model: Group },
            ],
        });
        if (!room) throw new NotFoundException("room don't exist ");
        return room;
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) room_id: RoomAttributes["room_id"],
        @Body() updateRoomDto: UpdateRoomDto,
    ) {
        return this.roomsService.update(+room_id, updateRoomDto);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Delete(":id")
    remove(@Param("id", ParseIntPipe) room_id: RoomAttributes["room_id"]) {
        return this.roomsService.remove(+room_id);
    }
}
