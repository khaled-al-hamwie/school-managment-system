import NumberValidator from "src/core/common/validators/number.validator";
import { PaymentAttributes } from "../interfaces/payment.interface";

export class CreatePaymentDto {
    @NumberValidator(1, 4294967295)
    prise_id: PaymentAttributes["prise_id"];

    student_id: PaymentAttributes["student_id"];
}
