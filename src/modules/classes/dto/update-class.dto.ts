import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateClassDto {
    @IsString()
    name?: string;

    @IsNumber()
    max_rooms?: number;
}