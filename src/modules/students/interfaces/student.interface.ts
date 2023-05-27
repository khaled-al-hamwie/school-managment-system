import { Optional } from "sequelize";
import { Gender } from "src/core/common/types/gender.type";
import { BusAttributes } from "src/modules/buses/interfaces/bus.interface";
import { CredentialAttributes } from "src/modules/credentials/interfaces/credential.interface";
import { RoomAttributes } from "src/modules/rooms/interfaces/room.interface";

export interface StudentAttributes {
    student_id?: number;
    credential_id: CredentialAttributes["credential_id"];
    room_id?: RoomAttributes["room_id"];
    bus_id?: BusAttributes["bus_id"];
    first_name: string;
    last_name: string;
    father_name: string;
    mother_name: string;
    birth_day: Date | string;
    gender: Gender;
    nationality?: string;
    phone_number: string;
    location: string;
    registration_date?: Date | string;
}

export type StudentCreationAttributes = Optional<
    StudentAttributes,
    "student_id"
>;
