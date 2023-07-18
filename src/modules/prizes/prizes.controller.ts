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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import ManagerGuard from "src/core/common/guards/manager.guard";
import {
    PHONE_TAG,
    PRISE_TAG,
    WEB_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { CreatePrizeDto } from "./dto/create-prize.dto";
import { UpdatePrizeDto } from "./dto/update-prize.dto";
import { PrizeInterceptor } from "./interceptors/prize.interceptor";
import { PriseAttributes } from "./interfaces/prise.interface";
import { PrizesService } from "./prizes.service";

@ApiTags(PRISE_TAG)
@Controller("prizes")
export class PrizesController {
    constructor(private readonly prizesService: PrizesService) {}

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    @UseInterceptors(PrizeInterceptor)
    create(
        @Req() request: Request,
        @Body() createPrizeDto: CreatePrizeDto,
        @UploadedFile() image?: Express.Multer.File,
    ) {
        return this.prizesService.create(
            createPrizeDto,
            `${request.protocol}://${request.hostname}:4000${request.originalUrl}/${image.filename}`,
        );
    }

    @ApiTags(WEB_TAG, PHONE_TAG)
    @Get()
    findAll() {
        return this.prizesService.findAll();
    }

    @ApiTags(WEB_TAG, PHONE_TAG)
    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) prise_id: PriseAttributes["prise_id"],
    ) {
        return this.prizesService.checkPrise(prise_id);
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) prise_id: PriseAttributes["prise_id"],
        @Body() updatePrizeDto: UpdatePrizeDto,
    ) {
        return this.prizesService.update(+prise_id, updatePrizeDto);
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Delete(":id")
    remove(@Param("id", ParseIntPipe) prise_id: PriseAttributes["prise_id"]) {
        return this.prizesService.remove(+prise_id);
    }
}
