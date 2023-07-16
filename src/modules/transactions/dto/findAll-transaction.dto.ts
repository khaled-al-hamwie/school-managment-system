import { Transform } from "class-transformer";
import { IsISO8601, IsInt, IsOptional, IsString } from "class-validator";
import { StudentAttributes } from "src/modules/students/interfaces/student.interface";
import { TeacherAttributes } from "src/modules/teachers/interfaces/teacher.interface";
import { TransactionAttributes } from "../interfaces/transaction.interface";

export class findAllTransactionDto {
    @IsOptional()
    @IsString()
    reason?: TransactionAttributes["reason"];

    @Transform(({ value }) => +value)
    @IsOptional()
    @IsInt()
    points?: TransactionAttributes["value"];

    @IsOptional()
    @IsISO8601()
    created_at?: TransactionAttributes["created_at"] | string;

    @IsOptional()
    @IsString()
    student_first_name?: StudentAttributes["first_name"];

    @IsOptional()
    @IsString()
    student_last_name?: StudentAttributes["last_name"];

    @IsOptional()
    @IsString()
    teacher_first_name?: TeacherAttributes["first_name"];

    @IsOptional()
    @IsString()
    teacher_last_name?: TeacherAttributes["last_name"];
}
