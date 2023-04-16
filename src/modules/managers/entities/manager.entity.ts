import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { Credential } from "src/modules/credentials/entities/credential.entity";
import {
	ManagerAttributes,
	ManagerCreationAttributes,
} from "../interfaces/manager.interface";

@Table
export default class Manager
	extends Model<ManagerAttributes, ManagerCreationAttributes>
	implements ManagerCreationAttributes
{
	@PrimaryKey
	@Column({
		autoIncrement: true,
		type: DataType.TINYINT,
	})
	manager_id: number;

	@ForeignKey(() => Credential)
	@Column({
		type: DataType.BIGINT,
		allowNull: false,
		unique: true,
	})
	credential_id: number;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	first_name: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	middle_name: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	last_name: string;

	@Column({
		type: DataType.STRING(20),
		allowNull: false,
		unique: true,
	})
	phone_number: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	location: string;

	@Column({
		type: DataType.DECIMAL(9, 2),
		allowNull: false,
		validate: { min: 0 },
	})
	salary: number;

	@BelongsTo(() => Credential)
	credentail: Credential;
}
