import { Optional } from "sequelize";

export interface TeacherAttributes {
	teacher_id?: number;
	credential_id: number;
	first_name: string;
	middle_name: string;
	last_name: string;
	birth_day: Date | string;
	gender: string;
	nationality?: string;
	phone_number: string;
	location: string;
	salary: number;
}

export interface TeacherCreationAttributes
	extends Optional<TeacherAttributes, "teacher_id"> {}
