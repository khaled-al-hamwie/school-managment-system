import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
import { PrizesService } from "../prizes/prizes.service";
import { StudentsService } from "../students/students.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Payment } from "./entities/payment.entity";
import { PaymentAttributes } from "./interfaces/payment.interface";

@Injectable()
export class PaymentsService {
    constructor(
        @InjectModel(Payment) private readonly paymentEntity: typeof Payment,
        private readonly studentsService: StudentsService,
        private readonly prizesService: PrizesService,
    ) {}
    async create(createPaymentDto: CreatePaymentDto) {
        const prise = await this.prizesService.findOne(
            createPaymentDto.prise_id,
        );
        if (!prise || (prise && prise.count == 0))
            throw new NotFoundException("prise doesn't exist");
        const student = await this.studentsService.findOne({
            where: { student_id: createPaymentDto.student_id },
        });
        if (student.points < prise.price)
            throw new ForbiddenException("no enouph points to pay");
        prise.count--;
        prise.save();
        student.points = student.points - prise.price;
        student.save();
        this.paymentEntity.create({ ...createPaymentDto, price: prise.price });
        return "done";
    }

    findAll(options: FindOptions<PaymentAttributes>) {
        return this.paymentEntity.findAll(options);
    }
}
