import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import ManagerGuard from "src/core/common/guards/manager.guard";
import StudentGuard from "src/core/common/guards/student.guard";
import {
    PAYMENT_TAG,
    PHONE_TAG,
    WEB_TAG,
} from "src/core/swagger/constants/swagger.tags";
import { Class } from "../classes/entities/class.entity";
import { Prise } from "../prizes/entities/prise.entity";
import { Room } from "../rooms/entities/room.entity";
import Student from "../students/entities/student.entity";
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
    @ApiTags(WEB_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Get()
    findAll() {
        return this.paymentsService.findAll({
            include: [
                {
                    model: Prise,
                    attributes: { exclude: ["count", "created_at"] },
                },
                {
                    model: Student,
                    attributes: {
                        exclude: [
                            "credential_id",
                            "bus_id",
                            "registration_date",
                        ],
                    },
                    include: [
                        {
                            model: Room,
                            attributes: ["name", "room_id"],
                            include: [
                                {
                                    model: Class,
                                    attributes: ["name", "class_id"],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }

    @ApiTags(PAYMENT_TAG)
    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Get("student")
    findAllStudent(
        @User("student_id") student_id: StudentAttributes["student_id"],
    ) {
        return this.paymentsService.findAll({
            where: { student_id },
            include: {
                model: Prise,
                attributes: { exclude: ["count", "created_at"] },
            },
        });
    }
}
