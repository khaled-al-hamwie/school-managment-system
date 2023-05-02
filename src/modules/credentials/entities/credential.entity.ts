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
    })
    email: string;

    @Column({
        type: DataType.STRING(245),
        allowNull: false,
    })
    password: string;

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
