import { Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Book } from "./entities/book.entity";
import { SubjectsModule } from "../subjects/subjects.module";

@Module({
    imports: [SequelizeModule.forFeature([Book]), SubjectsModule],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
