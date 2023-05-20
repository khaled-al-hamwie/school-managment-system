import { IsNumber, IsOptional, IsString } from "class-validator";
import { BookAttributes } from "../interfaces/book.interface";

export class FindAllBookDto {
    @IsString()
    @IsOptional()
    name: BookAttributes["name"];

    @IsNumber()
    @IsOptional()
    version: BookAttributes["version"];

    @IsNumber()
    @IsOptional()
    price: BookAttributes["price"];

}