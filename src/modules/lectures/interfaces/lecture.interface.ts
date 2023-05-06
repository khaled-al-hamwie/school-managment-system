import { Optional } from "sequelize";

export interface LectureAttributes {
    lecture_id?: number;
    // room_id: number;
    teach_id: number;
    day: number;
    period: number;
}

export type LectureCreationAttributes = Optional<
    LectureAttributes,
    "lecture_id"
>;
