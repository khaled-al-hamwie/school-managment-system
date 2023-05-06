import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, Length } from "class-validator";
import trimTransform from "../transformers/trim.transformer";

export default function NameValidator(min: number, max: number) {
    return applyDecorators(
        ApiProperty({ minimum: min, maximum: max }),
        IsString(),
        Transform(trimTransform),
        Length(min, max)
    );
}
