import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Class } from "src/modules/classes/entities/class.entity";
import {
    SubjectAttributes,
    SubjectCreationAttributes,
} from "../interfaces/subject.interface";

@Table
export class Subject
    extends Model<SubjectAttributes, SubjectCreationAttributes>
    implements SubjectCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT.UNSIGNED,
    })
    subject_id?: SubjectAttributes["subject_id"];

    @ForeignKey(() => Class)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    class_id: SubjectAttributes["class_id"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    name: SubjectAttributes["name"];

    @Column({
        type: DataType.TINYINT.UNSIGNED,
        allowNull: false,
    })
    semester: SubjectAttributes["semester"];

    @BelongsTo(() => Class)
    class: Class;
}
