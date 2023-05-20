import { Optional } from "sequelize";
import { RoomAttributes } from "src/modules/rooms/interfaces/room.interface";

export interface ScheduleAttributes {
    schedule_id?: number;
    room_id: RoomAttributes["room_id"];
    title: string;
    lecture_length: number;
    rest_length: number;
    days_count: number;
    is_current: boolean;
    created_at: Date;
    updated_at: Date;
}

export type ScheduleCreationAttributes = Optional<
    ScheduleAttributes,
    "schedule_id"
>;
