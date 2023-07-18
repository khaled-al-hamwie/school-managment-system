import { Optional } from "sequelize";

export interface PriseAttributes {
    prise_id?: number;
    name: string;
    details?: string;
    price: number;
    count: number;
    picture?: string;
    created_at?: Date;
}

export type PriseCreationAttributes = Optional<PriseAttributes, "prise_id">;
