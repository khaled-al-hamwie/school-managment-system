import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateClassDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    max_rooms: number;
}