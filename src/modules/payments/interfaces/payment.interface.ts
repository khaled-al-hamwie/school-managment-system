import { Optional } from "sequelize";
import { PriseAttributes } from "src/modules/prizes/interfaces/prise.interface";
import { StudentAttributes } from "src/modules/students/interfaces/student.interface";

export interface PaymentAttributes {
    payment_id?: number;
    prise_id: PriseAttributes["prise_id"];
    student_id: StudentAttributes["student_id"];
    price: number;
    created_at?: Date;
}

export type PaymentCreationAttributes = Optional<
    PaymentAttributes,
    "payment_id"
>;
