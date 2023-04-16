import {
	Column,
	DataType,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import {
	CredentialAttributes,
	CredentialCreationAttributes,
} from "../interfaces/credential.interface";

@Table
export class Credential
	extends Model<CredentialAttributes, CredentialCreationAttributes>
	implements CredentialCreationAttributes
{
	@PrimaryKey
	@Column({
		autoIncrement: true,
		type: DataType.BIGINT,
	})
	credential_id: number;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		unique: true,
	})
	user_name: string;

	@Column({
		type: DataType.STRING(500),
		allowNull: false,
		unique: true,
	})
	email: string;

	@Column({
		type: DataType.STRING(245),
		allowNull: false,
	})
	password: string;
}
