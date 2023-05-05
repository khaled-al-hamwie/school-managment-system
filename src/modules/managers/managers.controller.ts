import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import ManagerGuard from "src/core/guards/manager.guard";
import { ParseIntPagePipe } from "src/core/pipes/ParseIntPage.pipe";
import { MANAGER_TAG, WEB_TAG } from "src/core/swagger/constants/swagger.tags";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { FindAllManagerDto } from "./dto/findAll-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { ManagerAttributes } from "./interfaces/manager.interface";
import { ManagersService } from "./managers.service";

@ApiTags(MANAGER_TAG, WEB_TAG)
@Controller("managers")
export class ManagersController {
    constructor(private readonly managersService: ManagersService) {}

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    create(@Body() createManagerDto: CreateManagerDto) {
        return this.managersService.create(createManagerDto);
    }

    @Post("/login")
    @HttpCode(HttpStatus.OK)
    login(@Body() body: CreateAuthDto) {
        return this.managersService.login(body);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll(
        @Query() query: FindAllManagerDto,
        @Query("page", ParseIntPagePipe) page: number = 0
    ) {
        return this.managersService.findAll(query, page);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) manager_id: ManagerAttributes["manager_id"]
    ) {
        const manager = await this.managersService.findOne({ manager_id });
        if (!manager) throw new NotFoundException("teacher does'nt exists");
        return manager;
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) manager_id: ManagerAttributes["manager_id"],
        @Body() updateManagerDto: UpdateManagerDto
    ) {
        return this.managersService.update(+manager_id, updateManagerDto);
    }
}
