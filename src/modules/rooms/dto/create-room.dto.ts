import { ApiProperty } from "@nestjs/swagger";
import {
    ArrayMinSize,
    ArrayUnique,
    IsInt,
    IsOptional,
    Max,
    Min,
} from "class-validator";
import NameValidator from "src/core/common/validators/name.validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { CreateScheduleDto } from "src/modules/schedules/dto/create-schedule.dto";
import { StudentAttributes } from "src/modules/students/interfaces/student.interface";
import { RoomAttributes } from "../interfaces/room.interface";

export class CreateRoomDto extends CreateScheduleDto {
    @NumberValidator(1, 65535)
    class_id: RoomAttributes["class_id"];

    @NameValidator(3, 16)
    name: RoomAttributes["name"];

    @NumberValidator(1, 255)
    student_count: RoomAttributes["student_count"];

    @IsOptional()
    @ArrayUnique()
    @ApiProperty({ minimum: 1, maximum: 65535, default: [12, 20] })
    @IsInt({ each: true })
    @Min(1, { each: true })
    @Max(65535, { each: true })
    @ArrayMinSize(1)
    student_ids?: StudentAttributes["student_id"][];
}
