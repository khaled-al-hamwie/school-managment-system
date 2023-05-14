import NameValidator from "src/core/common/validators/name.validator";
import { ClassAttributes } from "../interfaces/class.interface";

export class CreateClassDto {
    @NameValidator(3, 16)
    name: ClassAttributes["name"];
}
