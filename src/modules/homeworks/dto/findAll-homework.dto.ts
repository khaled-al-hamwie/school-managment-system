import { PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { HomeworkAttributes } from "../interfaces/homework.interface";
import { CreateHomeworkDto } from "./create-homework.dto";

export class FindAllHomeworkDto extends PartialType(CreateHomeworkDto) {
    @IsOptional()
    @Transform(({ value }) => +value)
    @IsInt()
    room_id?: HomeworkAttributes["room_id"];
}
