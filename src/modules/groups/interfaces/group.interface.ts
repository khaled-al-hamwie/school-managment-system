import { Optional } from "sequelize";

export interface GroupAttributes {
    group_id?: number;
    room_id: number;
    name: string;
    picture_url: string;
}

export type GroupCreationAttributes = Optional<GroupAttributes, "group_id">;
