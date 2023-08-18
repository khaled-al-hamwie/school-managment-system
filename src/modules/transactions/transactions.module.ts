import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PushNotificationModule } from "../push-notification/push-notification.module";
import { StudentsModule } from "../students/students.module";
import { Transaction } from "./entities/transaction.entity";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Transaction]),
        StudentsModule,
        PushNotificationModule,
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule {}
