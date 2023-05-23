import { PartialType } from "@nestjs/swagger";
import { CreateHomeworkDto } from "./create-homework.dto";
import { HomeworkAttributes } from "../interfaces/homework.interface";

export class FindAllHomeworkDto extends PartialType(CreateHomeworkDto) {
    room_id?: HomeworkAttributes['room_id'];
}
