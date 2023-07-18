import { OmitType } from "@nestjs/swagger";
import { findAllTransactionDto } from "./findAll-transaction.dto";

export class findAllStudentTransactionDto extends OmitType(
    findAllTransactionDto,
    ["student_first_name", "student_last_name"],
) {}
