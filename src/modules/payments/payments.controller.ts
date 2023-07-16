import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import StudentGuard from "src/core/common/guards/student.guard";
import {
    PAYMENT_TAG,
    PHONE_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { StudentAttributes } from "../students/interfaces/student.interface";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentsService } from "./payments.service";

@Controller("payments")
@ApiTags(PAYMENT_TAG)
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @ApiTags(PHONE_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Post()
    create(
        @Body() createPaymentDto: CreatePaymentDto,
        @User("student_id") student_id: StudentAttributes["student_id"],
    ) {
        createPaymentDto.student_id = student_id;
        return this.paymentsService.create(createPaymentDto);
    }
    // student / manager
    @Get()
    findAll() {
        return this.paymentsService.findAll();
    }
}
