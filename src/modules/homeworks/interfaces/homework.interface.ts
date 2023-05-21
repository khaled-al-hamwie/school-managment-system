import { Optional } from "sequelize";
import { RoomAttributes } from "src/modules/rooms/interfaces/room.interface";
import { TeachAttributes } from "src/modules/teaches/interfaces/teach.interface";

export interface HomeworkAttributes {
    homework_id?: number;
    teach_id: TeachAttributes['teach_id'];
    room_id: RoomAttributes['room_id'];
    created_at: string;
    deadline_date: string;
    description: string;
}
export type HomeworkCreationAttributes = Optional<
    HomeworkAttributes,
    "homework_id"
>;