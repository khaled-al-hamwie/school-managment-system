import { Optional } from "sequelize";
import { DayType } from "src/core/common/types/day.type";
import { RoomAttributes } from "src/modules/rooms/interfaces/room.interface";
import { TeachAttributes } from "src/modules/teaches/interfaces/teach.interface";

export interface LectureAttributes {
    lecture_id?: number;
    room_id: RoomAttributes["room_id"];
    teach_id?: TeachAttributes["teach_id"];
    day: DayType;
    start_time: string;
    is_rest?: boolean;
}

export type LectureCreationAttributes = Optional<
    LectureAttributes,
    "lecture_id"
>;
