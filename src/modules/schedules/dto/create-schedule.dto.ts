import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayUnique,
    IsArray,
    IsEnum,
    IsInt,
    Matches,
    Min,
} from "class-validator";
import { DAY, DayType } from "src/core/common/types/day.type";
import NameValidator from "src/core/common/validators/name.validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { ScheduleDayAttributes } from "src/modules/schedule_days/interfaces/schedule_day.interface";
import { ScheduleAttributes } from "../interfaces/schedule.interface";

export class CreateScheduleDto {
    @NameValidator(3, 45)
    title: ScheduleAttributes["title"];

    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "school_start please provide a time in HH:MM format",
    })
    school_start: ScheduleDayAttributes["start_time"];

    @NumberValidator(1, 20)
    lecture_number: ScheduleDayAttributes["lecture_number"];

    @IsArray()
    @IsEnum(DAY, { message: "day please provide a day like mon", each: true })
    @ArrayUnique()
    @ArrayMinSize(1)
    @ArrayMaxSize(7)
    days: DayType[];

    @IsArray()
    @IsInt({ each: true })
    @Min(1, { each: true })
    @ArrayUnique()
    @ArrayMinSize(1)
    rests: number[];
}

// lecture length is 45 minute
// rest is 15 minute
