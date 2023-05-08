import NameValidator from "src/core/common/validators/name.validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { ClassAttributes } from "../interfaces/class.interface";

export class CreateClassDto {
    @NameValidator(3, 16)
    name: ClassAttributes["name"];

    @NumberValidator(1, 255)
    lecture_length: ClassAttributes["lecture_length"];

    @NumberValidator(1, 255)
    rest_length: ClassAttributes["rest_length"];

    @NumberValidator(1, 255)
    number_of_lectures: ClassAttributes["number_of_lectures"];
}
