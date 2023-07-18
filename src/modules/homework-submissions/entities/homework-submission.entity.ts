import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { Homework } from "src/modules/homeworks/entities/homework.entity";
import { Record } from "src/modules/records/entities/record.entity";
import {
    HomeworkSubmissionAttributes,
    HomeworkSubmissionCreationAttributes,
} from "../interfaces/homework-submission.interface";

@Table
export class HomeworkSubmission
    extends Model<
        HomeworkSubmissionAttributes,
        HomeworkSubmissionCreationAttributes
    >
    implements HomeworkSubmissionCreationAttributes
{
    @PrimaryKey
    @Column({
        type: DataType.BIGINT.UNSIGNED,
        autoIncrement: true,
    })
    homework_submission_id?: HomeworkSubmissionAttributes["homework_submission_id"];

    @ForeignKey(() => Record)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
    })
    record_id: HomeworkSubmissionAttributes["record_id"];

    @ForeignKey(() => Homework)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    homework_id: HomeworkSubmissionAttributes["homework_id"];

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    drive_link: HomeworkSubmissionAttributes["drive_link"];

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    is_checked: HomeworkSubmissionAttributes["is_checked"];

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    grade: HomeworkSubmissionAttributes["grade"];

    @BelongsTo(() => Record)
    record: Record;

    @BelongsTo(() => Homework)
    homework: Homework;
}
