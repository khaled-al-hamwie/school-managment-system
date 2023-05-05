import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty()
    @IsNumber()
    max_students: number;
}
