import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { CreateLectureDto } from "./dto/create-lecture.dto";
import { UpdateLectureDto } from "./dto/update-lecture.dto";
import { LecturesService } from "./lectures.service";

// see a schedual for a certain room public(in the room/roomid/scedual)
// see the lecture for a specific teacher only teachers (teacher/scedual) how has that id or manager
// add a lecture for a class manager
// remove a lecture for a class manager
// update a lecture for a class manager
@Controller("lectures")
export class LecturesController {
    constructor(private readonly lecturesService: LecturesService) {}

    @Post()
    create(@Body() createLectureDto: CreateLectureDto) {
        return this.lecturesService.create(createLectureDto);
    }

    @Get()
    findAll() {
        return this.lecturesService.findAll();
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
