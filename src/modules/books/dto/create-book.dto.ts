import NumberValidator from "src/core/common/validators/number.validator";
import { BookAttributes } from "../interfaces/book.interface";
import NameValidator from "src/core/common/validators/name.validator";
import { IsOptional, IsPositive } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class CreateBookDto {
    @Transform(({ value }: TransformFnParams) => Number(value))
    @NumberValidator(1, 65535)
    subject_id: BookAttributes["subject_id"];

    // @NumberValidator(1, 65535)
    // subject_id: BookAttributes["_id"];

    @NameValidator(5, 45)
    name: BookAttributes["name"];

    @IsPositive()
    @IsOptional()
    @NumberValidator(5, 45)
    version: BookAttributes["version"];

    @IsPositive()
    @IsOptional()
    @NumberValidator(5, 45)
    price: BookAttributes["price"];

    @IsOptional()
    @NameValidator(1, 250)
    description: BookAttributes["description"];

    @IsOptional()
    @NameValidator(1, 200)
    pdf_link: BookAttributes["pdf_link"];
}
