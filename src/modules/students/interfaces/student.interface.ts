import { Optional } from "sequelize";

export interface StudentAttributes {
	student_id?: number;
	credential_id: number;
	first_name: string;
	last_name: string;
	father_name: string;
	mother_name: string;
	birth_day: Date | string;
	gender: string;
	nationality?: string;
	phone_number: string;
	location: string;
	registration_date?: Date | string;
}

export interface StudentCreationAttributes
	extends Optional<StudentAttributes, "student_id"> {}
