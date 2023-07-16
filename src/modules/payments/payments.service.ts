import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PrizesService } from "../prizes/prizes.service";
import { StudentsService } from "../students/students.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Payment } from "./entities/payment.entity";

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
        if (!prise) throw new NotFoundException("prise doesn't exist");
        const student = await this.studentsService.findOne({
            where: { student_id: createPaymentDto.student_id },
        });
        if (prise.count == 0) {
            throw new ForbiddenException("prise has been sold out");
        }
        if (student.points < prise.price)
            throw new ForbiddenException("no enouph points to pay");
        prise.count--;
        prise.save();
        student.points = student.points - prise.price;
        student.save();
        this.paymentEntity.create(createPaymentDto);
        return "done";
    }

    findAll() {
        return `This action returns all payments`;
    }
}
