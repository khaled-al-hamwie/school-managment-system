import { HomeworkAttributes } from "../interfaces/homework.interface";

export class CreateHomeworkDto {
    room_id: HomeworkAttributes['room_id'];
    teach_id: HomeworkAttributes['teach_id'];
    created_at: HomeworkAttributes['created_at'];
    deadline_date: HomeworkAttributes['deadline_date'];
    description: HomeworkAttributes['description'];
}
