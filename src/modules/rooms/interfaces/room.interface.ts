import { Optional } from "sequelize";

export interface RoomAttributes {
    room_id?: number;
    class_id: number;
    max_students: number;
}

export type RoomCreationAttributes = Optional<RoomAttributes, "room_id">;
