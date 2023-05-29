import {
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Put,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { WhereOptions } from "sequelize";
import { User } from "src/core/common/decorators/user.decorator";
import StudentGuard from "src/core/common/guards/student.guard";
import whereWrapperTransform from "src/core/common/transformers/whereWrapper.transform";
import { StudentAttributes } from "src/modules/students/interfaces/student.interface";
import { StudentsBusesService } from "src/modules/students/services/students.buses.service";
import { BusesService } from "../buses.service";
import { BusAttributes } from "../interfaces/bus.interface";

@Controller("buses-subscribtions")
export class BusesSubscribtionsController {
    constructor(
        private readonly busesService: BusesService,
        private readonly studentsBusService: StudentsBusesService
    ) {}

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
    @Delete()
    unsubscribe(
        @User("student_id") student_id: StudentAttributes["student_id"]
    ) {
        return this.studentsBusService.unsubscribe(student_id);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) bus_id: BusAttributes["bus_id"]) {
        const bus = await this.busesService.findOne({
            where: { bus_id },
            attributes: { exclude: ["semester_price"] },
        });
        if (!bus) throw new NotFoundException("bus doesn't exist");
        return bus;
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Put(":id")
    async subscribe(
        @User("student_id") student_id: StudentAttributes["student_id"],
        @Param("id", ParseIntPipe) bus_id: BusAttributes["bus_id"]
    ) {
        const bus = await this.busesService.findOne({
            where: { bus_id },
            attributes: { exclude: ["semester_price"] },
        });
        if (!bus) throw new NotFoundException("bus doesn't exist");
        return this.studentsBusService.subscribe(student_id, bus_id);
    }
}
