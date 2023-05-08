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
        type: DataType.TINYINT.UNSIGNED,
    })
    manager_id?: ManagerAttributes["manager_id"];

    @ForeignKey(() => Credential)
    @Column({
        type: DataType.BIGINT.UNSIGNED,
        allowNull: false,
        unique: true,
    })
    credential_id: ManagerAttributes["credential_id"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    first_name: ManagerAttributes["first_name"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    middle_name: ManagerAttributes["middle_name"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    last_name: ManagerAttributes["last_name"];

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    birth_day: ManagerAttributes["birth_day"];

    @Column({
        type: DataType.STRING(2),
        allowNull: false,
    })
    gender: ManagerAttributes["gender"];

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
        defaultValue: "UK",
    })
    nationality?: ManagerAttributes["nationality"];

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    phone_number: ManagerAttributes["phone_number"];

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
    })
    location: ManagerAttributes["location"];

    @Column({
        type: DataType.DECIMAL(9, 2),
        allowNull: false,
        validate: { min: 0 },
    })
    salary: ManagerAttributes["salary"];

    @BelongsTo(() => Credential)
    credentail: Credential;
}
