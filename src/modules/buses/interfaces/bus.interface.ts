import { Optional } from "sequelize";

export interface BusAttributes {
    bus_id?: number;
    name: string;
    bus_monitor_name: string;
    bus_monitor_phone_number: string;
    arrival_time: string;
    pick_up_time: string;
    location_details?: string;
    semester_price: number;
    driver_fue: number;
}

export type BusCreationAttributes = Optional<BusAttributes, "bus_id">;
