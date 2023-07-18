import { Transform } from "class-transformer";
import NameValidator from "src/core/common/validators/name.validator";
import NumberValidator from "src/core/common/validators/number.validator";

export class CreatePrizeDto {
    @NameValidator(3, 255)
    name: string;

    @NameValidator(5, 500)
    details?: string;

    @Transform(({ value }) => +value)
    @NumberValidator(0, 10000)
    price: number;

    @Transform(({ value }) => +value)
    @NumberValidator(1, 10000)
    count: number;
}
