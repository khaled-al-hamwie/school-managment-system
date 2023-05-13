import { Type } from "class-transformer";
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayUnique,
    IsArray,
    IsBoolean,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    ValidateNested,
} from "class-validator";
import { DAY, DayType } from "src/core/common/types/day.type";
import NumberValidator from "src/core/common/validators/number.validator";
import { LectureAttributes } from "../interfaces/lecture.interface";

class PeriodDto {
    @NumberValidator(1, 16)
    lecture_number: number;

    @IsOptional()
    @NumberValidator(1, 65535)
    teach_id?: LectureAttributes["teach_id"];

    @IsOptional()
    @IsBoolean()
    is_rest?: LectureAttributes["is_rest"];
}
export class DayDto {
    @IsEnum(DAY, { message: "day please provide a day like mon" })
    day: DayType;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayUnique((o) => o.lecture_number)
    @Type(() => PeriodDto)
    periods: PeriodDto[];
}
export class CreateLectureDto {
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "school_start please provide a time in HH:MM format",
    })
    school_start: string;

    @IsOptional()
    @IsArray()
    @ArrayUnique((o) => o.day)
    @ArrayMinSize(1)
    @ArrayMaxSize(7)
    @ValidateNested({ each: true })
    @Type(() => DayDto)
    days?: DayDto[];

    @IsArray()
    @IsInt({ each: true })
    @ArrayUnique()
    @ArrayMinSize(1)
    rests: number[];
}
