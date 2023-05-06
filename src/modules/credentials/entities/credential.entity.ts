import {
    Column,
    CreatedAt,
    DataType,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
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
        type: DataType.BIGINT.UNSIGNED,
    })
    credential_id: CredentialAttributes["credential_id"];

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        unique: true,
    })
    user_name: CredentialAttributes["user_name"];

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    email: CredentialAttributes["email"];

    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    password: CredentialAttributes["password"];

    @CreatedAt
    @Column({
        allowNull: false,
        defaultValue: new Date(),
    })
    created_at: Date;

    @UpdatedAt
    @Column({
        allowNull: false,
        defaultValue: new Date(),
    })
    updated_at: Date;
}
