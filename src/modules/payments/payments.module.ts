import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PrizesModule } from "../prizes/prizes.module";
import { StudentsModule } from "../students/students.module";
import { Payment } from "./entities/payment.entity";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Payment]),
        StudentsModule,
        PrizesModule,
    ],
    controllers: [PaymentsController],
    providers: [PaymentsService],
})
export class PaymentsModule {}
