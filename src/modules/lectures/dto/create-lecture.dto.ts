import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateLectureDto {
    @IsNotEmpty()
    @IsNumber()
    day: string;

    @IsNotEmpty()
    @IsNumber()
    period: number;
}