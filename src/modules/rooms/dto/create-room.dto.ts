import NumberValidator from "src/core/common/validators/number.validator";
import { RoomAttributes } from "../interfaces/room.interface";

export class CreateRoomDto {
    @NumberValidator(1, 65535)
    class_id: RoomAttributes["class_id"];

    @NumberValidator(1, 255)
    student_count: RoomAttributes["student_count"];
}
