import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { SUBJECT_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { SubjectsService } from "./subjects.service";

@ApiTags(SUBJECT_TAG, WEB_TAG)
@Controller("subjects")
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) {}

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    create(@Body() createSubjectDto: CreateSubjectDto) {
        return this.subjectsService.create(createSubjectDto);
    }
    // one for the manager, will get all the subject for a specific class
    // one for a teacher , will return his subject
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll() {
        return this.subjectsService.findAll();
    }

    // detalils like what teachers teach this subject
    // what are the book of the subject
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.subjectsService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateSubjectDto: UpdateSubjectDto
    ) {
        return this.subjectsService.update(+id, updateSubjectDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.subjectsService.remove(+id);
    }
}
