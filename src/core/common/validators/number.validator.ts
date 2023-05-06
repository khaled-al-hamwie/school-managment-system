import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, Max, Min } from "class-validator";

export default function NumberValidator(min: number, max: number) {
    return applyDecorators(
        ApiProperty({ minimum: min, maximum: max }),
        IsInt(),
        Min(min),
        Max(max)
    );
}
