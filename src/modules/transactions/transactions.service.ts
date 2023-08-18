import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
import { PushNotificationService } from "../push-notification/push-notification.service";
import { StudentsService } from "../students/students.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transaction } from "./entities/transaction.entity";
import { TransactionAttributes } from "./interfaces/transaction.interface";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectModel(Transaction)
        private readonly TransactionEntity: typeof Transaction,
        private readonly studentsService: StudentsService,
        private readonly pushNotificationService: PushNotificationService,
    ) {}
    async create(createTransactionDto: CreateTransactionDto) {
        const student = await this.studentsService.findOne({
            where: { student_id: createTransactionDto.student_id },
        });
        if (!student) {
            throw new NotFoundException("student dosen't exists");
        }
        this.TransactionEntity.create(createTransactionDto);
        student.points += createTransactionDto.value;
        student.save();
        this.pushNotificationService.send(student.student_id, {
            body: `you have recived ${createTransactionDto.value} points from teacher`,
            title: "Transaction Made",
        });
        return "done";
    }

    findAll(options: FindOptions<TransactionAttributes>) {
        return this.TransactionEntity.findAll(options);
    }
}
