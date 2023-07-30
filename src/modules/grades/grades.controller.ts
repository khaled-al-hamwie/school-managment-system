import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { GradesService } from "./grades.service";

@Controller("grades")
export class GradesController {
    constructor(private readonly gradesService: GradesService) {}
    // teacher put grade
    // teacher get grades
    // student get grades
    // admin get grades
    @Get()
    findAll() {
        return this.gradesService.findAll();
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateGradeDto: UpdateGradeDto) {
        return this.gradesService.update(+id, updateGradeDto);
    }
}
