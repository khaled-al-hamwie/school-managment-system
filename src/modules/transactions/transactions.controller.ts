import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import TeacherGuard from "src/core/common/guards/teacher.guard";
import {
    PHONE_TAG,
    TRANSACTION_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
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

    @Get()
    findAll() {
        return this.transactionsService.findAll();
    }
}
