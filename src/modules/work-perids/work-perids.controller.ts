import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { CreateWorkPeridDto } from "./dto/create-work-perid.dto";
import { UpdateWorkPeridDto } from "./dto/update-work-perid.dto";
import { WorkPeridsService } from "./work-perids.service";

// add a work periods for a teacher
// update it
// reomve it
// show for a specific teacher
@Controller("teachers/:teacherId/work-perids")
export class WorkPeridsController {
    constructor(private readonly workPeridsService: WorkPeridsService) {}

    @Post()
    create(@Body() createWorkPeridDto: CreateWorkPeridDto) {
        return this.workPeridsService.create(createWorkPeridDto);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.workPeridsService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateWorkPeridDto: UpdateWorkPeridDto
    ) {
        return this.workPeridsService.update(+id, updateWorkPeridDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.workPeridsService.remove(+id);
    }
}
