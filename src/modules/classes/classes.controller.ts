import {
    Body,
    Controller,
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
import { CLASS_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import { Room } from "../rooms/entities/room.entity";
import { Subject } from "../subjects/entities/subject.entity";
import { ClassesService } from "./classes.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { ClassAttributes } from "./interfaces/class.interface";

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
    findAll(@Query("name") name: ClassAttributes["name"]) {
        return this.classesService.findAll(name);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) class_id: ClassAttributes["class_id"]
    ) {
        const myClass = await this.classesService.findOne({
            where: { class_id },
            include: [{ model: Subject }, { model: Room }],
        });
        if (!myClass) throw new NotFoundException("class doesn't exist");
        return myClass;
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) id: ClassAttributes["class_id"],
        @Body() updateClassDto: UpdateClassDto
    ) {
        return this.classesService.update(+id, updateClassDto);
    }
}
