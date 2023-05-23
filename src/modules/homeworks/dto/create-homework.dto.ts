import { IsValidDate } from "src/core/common/validators/date.validator";
import { HomeworkAttributes } from "../interfaces/homework.interface";
import NumberValidator from "src/core/common/validators/number.validator";
import NameValidator from "src/core/common/validators/name.validator";

export class CreateHomeworkDto {
    @NumberValidator(1, 65535)
    room_id: HomeworkAttributes['room_id'];
    @NumberValidator(1, 65535)
    teach_id: HomeworkAttributes['teach_id'];
    @IsValidDate()
    deadline_date: HomeworkAttributes['deadline_date'];
    @NameValidator(1, 250)
    description: HomeworkAttributes['description'];
}
