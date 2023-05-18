import { Type } from "class-transformer";
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayUnique,
    IsArray,
    IsEnum,
    ValidateNested,
} from "class-validator";
import { DAY, DayType } from "src/core/common/types/day.type";
import NumberValidator from "src/core/common/validators/number.validator";
import { LectureAttributes } from "src/modules/lectures/interfaces/lecture.interface";

class LectureDto {
    @NumberValidator(1, 16)
    lecture_number: number;

    @NumberValidator(0, 65535)
    teach_id: LectureAttributes["teach_id"];
}
export class DayDto {
    @IsEnum(DAY, { message: "day please provide a day like mon" })
    day: DayType;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @ArrayUnique((o) => o.lecture_number)
    @Type(() => LectureDto)
    lectures: LectureDto[];
}

export class UpdateScheduleDto {
    @IsArray()
    @ArrayUnique((o) => o.day)
    @ArrayMinSize(1)
    @ArrayMaxSize(7)
    @ValidateNested({ each: true })
    @Type(() => DayDto)
    days: DayDto[];
}
