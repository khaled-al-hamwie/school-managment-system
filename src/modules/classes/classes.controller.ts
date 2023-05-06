import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import ManagerGuard from "src/core/guards/manager.guard";
import { CLASS_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import { ClassesService } from "./classes.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";

@ApiTags(CLASS_TAG, WEB_TAG)
@Controller("classes")
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    create(@Body() createClassDto: CreateClassDto) {
        return this.classesService.create(createClassDto);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll(@Query("name") name: string) {
        return this.classesService.findAll(name);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateClassDto: UpdateClassDto) {
        return this.classesService.update(+id, updateClassDto);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.classesService.remove(+id);
    }
}
