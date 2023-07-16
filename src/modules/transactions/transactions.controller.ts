import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Op } from "sequelize";
import { User } from "src/core/common/decorators/user.decorator";
import ManagerGuard from "src/core/common/guards/manager.guard";
import TeacherGuard from "src/core/common/guards/teacher.guard";
import { ParseIntPagePipe } from "src/core/common/pipes/ParseIntPage.pipe";
import whereWrapperTransform from "src/core/common/transformers/whereWrapper.transform";
import {
    PHONE_TAG,
    TRANSACTION_TAG,
    WEB_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { Class } from "../classes/entities/class.entity";
import { Room } from "../rooms/entities/room.entity";
import Student from "../students/entities/student.entity";
import Teacher from "../teachers/entities/teacher.entity";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { findAllTransactionDto } from "./dto/findAll-transaction.dto";
import {
    studentInclude,
    studentIncludeAttribute,
    teacherIncludeAttribute,
} from "./options/findAll.include.option";
import { TransactionsService } from "./transactions.service";

@ApiTags(TRANSACTION_TAG)
@Controller("transactions")
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Post()
    create(
        @Body() createTransactionDto: CreateTransactionDto,
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
    ) {
        createTransactionDto.teacher_id = teacher_id;
        return this.transactionsService.create(createTransactionDto);
    }

    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll(
        @Query() query: findAllTransactionDto,
        @Query("page", ParseIntPagePipe) page: number,
    ) {
        const whereWrapperObject = whereWrapperTransform(query);
        return this.transactionsService.findAll({
            where: {
                value: query["points"] ? query["points"] : { [Op.ne]: null },
                reason: query["reason"]
                    ? whereWrapperObject["reason"]
                    : { [Op.ne]: null },
                created_at: query["created_at"]
                    ? { [Op.gt]: new Date(query["created_at"]) }
                    : { [Op.ne]: null },
            },
            include: [
                {
                    model: Student,
                    attributes: studentIncludeAttribute,
                    where: {
                        first_name: query["student_first_name"]
                            ? { [Op.regexp]: query["student_first_name"] }
                            : { [Op.ne]: null },
                        last_name: query["student_last_name"]
                            ? { [Op.regexp]: query["student_last_name"] }
                            : { [Op.ne]: null },
                    },
                    include: [studentInclude],
                },
                {
                    model: Teacher,
                    attributes: teacherIncludeAttribute,
                    where: {
                        first_name: query["teacher_first_name"]
                            ? { [Op.regexp]: query["teacher_first_name"] }
                            : { [Op.ne]: null },
                        last_name: query["teacher_last_name"]
                            ? { [Op.regexp]: query["teacher_last_name"] }
                            : { [Op.ne]: null },
                    },
                },
            ],
        });
    }
}
