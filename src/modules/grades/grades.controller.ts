import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Put,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import TeacherGuard from "src/core/common/guards/teacher.guard";
import { PHONE_TAG } from "src/core/swagger/constants/swagger.tags";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { PutGradeDto } from "./dto/put-grade.dto";
import { GradesService } from "./grades.service";
import { GradeAttributes } from "./interfaces/grade.interface";

@Controller("grades")
export class GradesController {
    constructor(private readonly gradesService: GradesService) {}
    // teacher put grade
    // student get grades

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get(":id")
    findGradesTeacher(
        @Param("id", ParseIntPipe)
        exam_id: GradeAttributes["exam_id"],
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
    ) {
        return this.gradesService.findForTeacher(exam_id, teacher_id);
    }

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Put(":id")
    put(
        @Param("id", ParseIntPipe)
        grade_id: GradeAttributes["grade_id"],
        @Body() updateGradeDto: PutGradeDto,
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
    ) {
        return this.gradesService.put(+grade_id, updateGradeDto, teacher_id);
    }
}
