import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateSubjectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    semester: number;
}
