import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";
import ManagerGuard from "src/core/common/guards/manager.guard";
import { CreatePrizeDto } from "./dto/create-prize.dto";
import { UpdatePrizeDto } from "./dto/update-prize.dto";
import { PrizeInterceptor } from "./interceptors/prize.interceptor";
import { PriseAttributes } from "./interfaces/prise.interface";
import { PrizesService } from "./prizes.service";

@Controller("prizes")
export class PrizesController {
    constructor(private readonly prizesService: PrizesService) {}

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    @UseInterceptors(PrizeInterceptor)
    create(
        @Req() request: Request,
        @Body() createPrizeDto: CreatePrizeDto,
        @UploadedFile() image?: Express.Multer.File,
    ) {
        console.info();
        return this.prizesService.create(
            createPrizeDto,
            `${request.protocol}://${request.hostname}:4000${request.originalUrl}/${image.filename}`,
        );
    }

    @Get()
    findAll() {
        return this.prizesService.findAll();
    }

    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) prise_id: PriseAttributes["prise_id"],
    ) {
        return this.prizesService.checkprise(prise_id);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) prise_id: PriseAttributes["prise_id"],
        @Body() updatePrizeDto: UpdatePrizeDto,
    ) {
        return this.prizesService.update(+prise_id, updatePrizeDto);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Delete(":id")
    remove(@Param("id", ParseIntPipe) prise_id: PriseAttributes["prise_id"]) {
        return this.prizesService.remove(+prise_id);
    }
}
