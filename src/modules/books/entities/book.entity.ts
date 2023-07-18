import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    PrimaryKey,
    Table,
    Model,
} from "sequelize-typescript";
import {
    BookAttributes,
    BookCreationAttributes,
} from "../interfaces/book.interface";
import { Subject } from "src/modules/subjects/entities/subject.entity";

@Table
export class Book
    extends Model<BookAttributes, BookCreationAttributes>
    implements BookCreationAttributes
{
    @PrimaryKey
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        autoIncrement: true,
    })
    book_id?: BookAttributes["book_id"];

    @ForeignKey(() => Subject)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
    })
    subject_id: BookAttributes["subject_id"];

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
    })
    name: BookAttributes["name"];

    @Column({
        type: DataType.DECIMAL(9, 2),
    })
    version?: BookAttributes["version"];

    @Column({
        type: DataType.DECIMAL(9, 2),
    })
    price?: BookAttributes["price"];

    @Column({
        type: DataType.STRING(240),
    })
    description?: BookAttributes["description"];

    @Column({
        type: DataType.STRING(45),
    })
    pdf_link?: BookAttributes["pdf_link"];

    @BelongsTo(() => Subject)
    subject: Subject;
}
