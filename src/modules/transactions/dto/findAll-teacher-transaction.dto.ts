import { OmitType } from "@nestjs/swagger";
import { findAllTransactionDto } from "./findAll-transaction.dto";

export class findAllTeacherTransactionDto extends OmitType(
    findAllTransactionDto,
    ["teacher_first_name", "teacher_last_name"],
) {}
