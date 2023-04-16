import { Optional } from "sequelize";

export interface ManagerAttributes {
	manager_id?: number;
	credential_id: number;
	first_name: string;
	middle_name: string;
	last_name: string;
	phone_number: string;
	location: string;
	salary: number;
}

export interface ManagerCreationAttributes
	extends Optional<ManagerAttributes, "manager_id"> {}
