import { IsNumber, IsOptional, IsString } from "class-validator";
import { BookAttributes } from "../interfaces/book.interface";

export class FindAllBookDto {
    @IsString()
    name: BookAttributes["name"];

    @IsNumber()
    @IsOptional()
    version: BookAttributes["version"];

    @IsNumber()
    @IsOptional()
    price: BookAttributes["price"];

}