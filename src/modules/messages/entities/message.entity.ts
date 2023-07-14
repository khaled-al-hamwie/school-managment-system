import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Group } from "src/modules/groups/entities/group.entity";
import Student from "src/modules/students/entities/student.entity";
import Teacher from "src/modules/teachers/entities/teacher.entity";
import {
    MessageAttributes,
    MessageCreationAttributes,
} from "../interfaces/message.interface";

@Table({
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    deletedAt: "deleted_at",
    updatedAt: "updated_at",
})
export class Message
    extends Model<MessageAttributes, MessageCreationAttributes>
    implements MessageCreationAttributes
{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    message_id?: MessageAttributes["message_id"];

    @Column({
        type: DataType.STRING(1000),
        allowNull: false,
    })
    message: MessageAttributes["message"];

    @ForeignKey(() => Group)
    @Column({
        allowNull: false,
        type: DataType.SMALLINT.UNSIGNED,
    })
    group_id: MessageAttributes["group_id"];

    @ForeignKey(() => Teacher)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
    })
    teacher_id?: MessageAttributes["teacher_id"];

    @ForeignKey(() => Student)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
    })
    student_id?: MessageAttributes["student_id"];

    @BelongsTo(() => Group)
    group: Group;

    @BelongsTo(() => Teacher)
    teacher: Teacher;

    @BelongsTo(() => Student)
    student: Student;
}
