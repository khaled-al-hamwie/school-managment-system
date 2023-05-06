import { PartialType, PickType } from "@nestjs/swagger";
import { CreateRoomDto } from "./create-room.dto";

export class UpdateRoomDto extends PartialType(
    PickType(CreateRoomDto, ["name", "student_count"])
) {}
