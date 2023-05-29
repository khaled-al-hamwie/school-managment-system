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
import { WhereOptions } from "sequelize";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { BUS_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import whereWrapperTransform from "../../core/common/transformers/whereWrapper.transform";
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
    findAll(@Query("name") name: string | null) {
        let where: WhereOptions<BusAttributes> = name
            ? whereWrapperTransform({ name })
            : {};
        return this.busesService.findAll({ where });
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.busesService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateBusDto: UpdateBusDto) {
        return this.busesService.update(+id, updateBusDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.busesService.remove(+id);
    }
}
