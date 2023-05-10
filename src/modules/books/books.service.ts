import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';
import { SubjectsService } from '../subjects/subjects.service';
import { BookAttributes } from './interfaces/book.interface';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { Subject } from '../subjects/entities/subject.entity';
import { FindAllBookDto } from './dto/findAll-book.dto';
import { error } from 'console';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book) private readonly BookEntity: typeof Book,
    private readonly subjectsService: SubjectsService
  ) { }
  async create(createBookDto: CreateBookDto) {
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
    })
  }

  async update(
    book_id: BookAttributes["book_id"],
    updateBookDto: UpdateBookDto
  ) {
    const book = await this.findOne({ book_id });
    if (!book) throw new NotFoundException("book doesn't exist");
    book.update(UpdateBookDto).then((output) => output.save());
    return "done";
  }

  async remove(book_id: BookAttributes["book_id"]) {
    const book = await this.findOne({ book_id });
    if (!book) throw new NotFoundException("book doesn't exist");
    this.BookEntity.destroy({ where: { book_id } }).
      then(() => {
        return "done";
      }).catch(() => {
        throw new error("the book couldn't be deleted..");
      })
  }
}
