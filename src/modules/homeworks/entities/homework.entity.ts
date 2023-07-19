import { Sequelize } from "sequelize";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { HomeworkSubmission } from "src/modules/homework-submissions/entities/homework-submission.entity";
import { Room } from "src/modules/rooms/entities/room.entity";
import { Teach } from "src/modules/teaches/entities/teach.entity";
import {
    HomeworkAttributes,
    HomeworkCreationAttributes,
} from "../interfaces/homework.interface";

@Table
export class Homework
    extends Model<HomeworkAttributes, HomeworkCreationAttributes>
    implements HomeworkCreationAttributes
{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.SMALLINT.UNSIGNED,
    })
    homework_id?: HomeworkAttributes["homework_id"];
    @ForeignKey(() => Room)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    room_id: HomeworkAttributes["room_id"];
    @ForeignKey(() => Teach)
    @Column({
        type: DataType.MEDIUMINT.UNSIGNED,
        allowNull: false,
    })
    teach_id: HomeworkAttributes["teach_id"];
    @Column({
        type: DataType.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    })
    created_at: HomeworkAttributes["created_at"];
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    deadline_date: HomeworkAttributes["created_at"];
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: HomeworkAttributes["description"];
    @BelongsTo(() => Room)
    room: Room;
    @BelongsTo(() => Teach)
    teach: Teach;
    // has many homework submissions..

    @HasMany(() => HomeworkSubmission)
    homework_submissions: HomeworkSubmission[];
}
