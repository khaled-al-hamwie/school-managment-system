import { SubjectAttributes, SubjectCreationAttributes } from "../interfaces/subject.interface";
import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Class } from "src/modules/classes/entities/class.entity";

@Table
export class Subject extends Model<SubjectAttributes, SubjectCreationAttributes>
    implements SubjectCreationAttributes {
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT,
    })
    subject_id?: number;

    @ForeignKey(() => Class)
    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
    })
    class_id: number;

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
    })
    semester: number;

    @BelongsTo(() => Class)
    class: Class;
}