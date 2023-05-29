import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { WhereOptions } from "sequelize";
import StudentGuard from "src/core/common/guards/student.guard";
import whereWrapperTransform from "src/core/common/transformers/whereWrapper.transform";
import { BusesService } from "../buses.service";
import { BusAttributes } from "../interfaces/bus.interface";
import { BusesSubscribtionsService } from "./buses-subscribtions.service";
import { CreateBusesSubscribtionDto } from "./dto/create-buses-subscribtion.dto";

@Controller("buses-subscribtions")
export class BusesSubscribtionsController {
    constructor(
        private readonly busesSubscribtionsService: BusesSubscribtionsService,
        private readonly busesService: BusesService
    ) {}

    @Post()
    create(@Body() createBusesSubscribtionDto: CreateBusesSubscribtionDto) {
        return this.busesSubscribtionsService.create(
            createBusesSubscribtionDto
        );
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Get()
    findAll(@Query("name") name: BusAttributes["name"] | null) {
        const where: WhereOptions<BusAttributes> = name
            ? whereWrapperTransform({ name })
            : {};
        return this.busesService.findAll({ where });
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) bus_id: BusAttributes["bus_id"]) {
        const bus = await this.busesService.findOne({
            where: { bus_id },
            attributes: { exclude: ["semester_price", "driver_fue"] },
        });
        if (!bus) throw new NotFoundException("bus doesn't exist");
        return bus;
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.busesSubscribtionsService.remove(+id);
    }
}
