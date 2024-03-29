import {
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as fs from "fs";
import { Op, WhereOptions } from "sequelize";
import { Subject } from "../subjects/entities/subject.entity";
import { SubjectsService } from "../subjects/subjects.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { FindAllBookDto } from "./dto/findAll-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./entities/book.entity";
import { BookAttributes } from "./interfaces/book.interface";

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book) private readonly BookEntity: typeof Book,
        private readonly subjectsService: SubjectsService,
    ) {}
    async create(createBookDto: CreateBookDto, file?: Express.Multer.File) {
        const mySubject = await this.subjectsService.findOne({
            subject_id: createBookDto.subject_id,
        });
        if (!mySubject) throw new NotFoundException("subject doesn't exist");
        this.BookEntity.create(createBookDto);
        return "done";
    }

    async findAll(query: FindAllBookDto, page = 0) {
        const whereOptions: WhereOptions<BookAttributes> = {};
        for (const key in query) {
            if (Object.prototype.hasOwnProperty.call(query, key)) {
                whereOptions[key] = { [Op.regexp]: query[key] };
            }
        }
        return await this.BookEntity.findAll({
            where: whereOptions,
            attributes: { exclude: ["subject_id"] },
            include: {
                model: Subject,
            },
            offset: page * 5,
            limit: 5,
            order: [["name", "ASC"]],
        });
    }

    async findOne(options: WhereOptions<BookAttributes>) {
        return await this.BookEntity.findOne({
            where: options,
            limit: 1,
        });
    }

    async update(book_id: number, updateBookDto: UpdateBookDto) {
        const book = await this.findOne({ book_id });

        if (!book) {
            throw new NotFoundException("Book not found");
        }

        Object.assign(book, updateBookDto);
        book.save();
        return "done";
    }

    async remove(book_id: BookAttributes["book_id"]) {
        const book = await this.findOne({ book_id });
        if (!book) throw new NotFoundException("book doesn't exist");
        if (book.pdf_link) {
            this.deleteFile(book.pdf_link);
        }
        this.BookEntity.destroy({ where: { book_id } })
            .then(() => {
                return "done";
            })
            .catch(() => {
                throw new ForbiddenException("the book couldn't be deleted..");
            });
    }

    async deleteFile(filePath: string): Promise<void> {
        try {
            await fs.promises.unlink(filePath);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
