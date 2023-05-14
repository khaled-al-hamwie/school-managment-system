import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from "@nestjs/common";
import { CreateLectureDto } from "./dto/create-lecture.dto";
import { UpdateLectureDto } from "./dto/update-lecture.dto";
import { LectureAttributes } from "./interfaces/lecture.interface";
import { LecturesService } from "./lectures.service";

// see a schedual for a certain room public(in the room/roomid/scedual)
// see the lecture for a specific teacher only teachers (teacher/scedual) how has that id or manager
// add a lecture for a class manager
// remove a lecture for a class manager
// update a lecture for a class manager
@Controller("rooms/:room_id/lectures")
export class LecturesController {
    constructor(private readonly lecturesService: LecturesService) {}

    @Post()
    createSchedual(
        // @Param("room_id", ParseIntPipe) room_id: LectureAttributes["room_id"],
        @Body() createLectureDto: CreateLectureDto
    ) {
        // return this.lecturesService.create(room_id, createLectureDto);
    }

    @Get()
    findAll() {
        return "hjkl";
        // return this.lecturesService.findAll();
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateLectureDto: UpdateLectureDto
    ) {
        return this.lecturesService.update(+id, updateLectureDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.lecturesService.remove(+id);
    }
}
