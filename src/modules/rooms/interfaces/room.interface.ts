import { Optional } from "sequelize";

export interface RoomAttributes {
    room_id?: number;
    class_id: number;
    student_count: number;
}

export type RoomCreationAttributes = Optional<RoomAttributes, "room_id">;
