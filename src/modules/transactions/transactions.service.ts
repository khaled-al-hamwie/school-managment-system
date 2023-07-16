import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
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
        return "done";
    }

    findAll(options: FindOptions<TransactionAttributes>) {
        return this.TransactionEntity.findAll(options);
    }
}
