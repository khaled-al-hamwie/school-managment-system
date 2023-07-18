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
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { ParseIntPagePipe } from "src/core/common/pipes/ParseIntPage.pipe";
import { SUBJECT_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import { include } from "./constants";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { DeleteSubjectDto } from "./dto/delete-subject.dto";
import { FindAllSubjectDto } from "./dto/findAll-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { SubjectAttributes } from "./interfaces/subject.interface";
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
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll(
        @Query() query: FindAllSubjectDto,
        @Query("page", ParseIntPagePipe) page: number,
    ) {
        return this.subjectsService.findAll(query, page);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) subject_id: SubjectAttributes["subject_id"],
    ) {
        const subject = await this.subjectsService.findOne(
            { subject_id },
            {
                include,
            },
        );
        if (!subject) throw new NotFoundException("subject doesn't exist");
        return subject;
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) subject_id: SubjectAttributes["subject_id"],
        @Body() updateSubjectDto: UpdateSubjectDto,
    ) {
        return this.subjectsService.update(+subject_id, updateSubjectDto);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Delete(":id")
    remove(
        @Param("id", ParseIntPipe) subject_id: SubjectAttributes["subject_id"],
    ) {
        return this.subjectsService.remove(+subject_id);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Delete(":id/teacher")
    removeTeachers(
        @Param("id", ParseIntPipe) subject_id: SubjectAttributes["subject_id"],
        @Body() deleteSubjectDto: DeleteSubjectDto,
    ) {
        return this.subjectsService.removeTeachers(
            +subject_id,
            deleteSubjectDto,
        );
    }
}
