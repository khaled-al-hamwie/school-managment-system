import { Transform } from "class-transformer";
import NameValidator from "src/core/common/validators/name.validator";
import NumberValidator from "src/core/common/validators/number.validator";
import { MessageAttributes } from "../interfaces/message.interface";

export class CreateMessageDto {
    @NameValidator(1, 1000)
    message!: MessageAttributes["message"];

    @NumberValidator(1, 65535)
    group_id!: MessageAttributes["group_id"];

    @Transform(() => null)
    teacher_id?: MessageAttributes["teacher_id"];

    @Transform(() => null)
    student_id?: MessageAttributes["student_id"];
}
