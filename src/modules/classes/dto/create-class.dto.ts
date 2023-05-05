import { IsInt, IsPositive } from "class-validator";
import NameValidator from "src/core/validators/name.validator";
import { ClassAttributes } from "../interfaces/class.interface";

export class CreateClassDto {
    @NameValidator(3, 16)
    name: ClassAttributes["name"];

    @IsPositive()
    @IsInt()
    max_rooms: ClassAttributes["max_rooms"];
}
