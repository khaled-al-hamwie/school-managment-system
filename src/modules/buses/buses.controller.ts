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
import { WhereOptions } from "sequelize";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { BUS_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import whereWrapperTransform from "../../core/common/transformers/whereWrapper.transform";
import Student from "../students/entities/student.entity";
import { BusesService } from "./buses.service";
import { CreateBusDto } from "./dto/create-bus.dto";
import { UpdateBusDto } from "./dto/update-bus.dto";
import { BusAttributes } from "./interfaces/bus.interface";
@ApiTags(BUS_TAG, WEB_TAG)
@Controller("buses")
export class BusesController {
    constructor(private readonly busesService: BusesService) {}

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    create(@Body() createBusDto: CreateBusDto) {
        return this.busesService.create(createBusDto);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll(@Query("name") name: BusAttributes["name"] | null) {
        const where: WhereOptions<BusAttributes> = name
            ? whereWrapperTransform({ name })
            : {};
        return this.busesService.findAll({ where });
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) bus_id: BusAttributes["bus_id"]) {
        const bus = await this.busesService.findOne({
            where: { bus_id },
            include: Student,
        });
        if (!bus) throw new NotFoundException("bus doesn't exist");
        return bus;
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) bus_id: BusAttributes["bus_id"],
        @Body() updateBusDto: UpdateBusDto,
    ) {
        return this.busesService.update(+bus_id, updateBusDto);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Delete(":id")
    remove(@Param("id", ParseIntPipe) bus_id: BusAttributes["bus_id"]) {
        return this.busesService.remove(+bus_id);
    }
}
