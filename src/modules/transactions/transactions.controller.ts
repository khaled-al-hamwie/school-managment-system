import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionsService } from "./transactions.service";

@Controller("transactions")
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.create(createTransactionDto);
    }

    @Get()
    findAll() {
        return this.transactionsService.findAll();
    }
}
