import { Transform } from "class-transformer";
import NameValidator from "src/core/common/validators/name.validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { TransactionAttributes } from "../interfaces/transaction.interface";

export class CreateTransactionDto {
    @NumberValidator(1, 65535)
    student_id: TransactionAttributes["student_id"];

    @NumberValidator(-10, 10)
    value: TransactionAttributes["value"];

    @NameValidator(3, 500)
    reason: TransactionAttributes["reason"];

    @Transform(() => null)
    teacher_id: TransactionAttributes["teacher_id"];
}
