import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Query } from "@nestjs/common";
import { FindAllBookDto } from "./dto/findAll-book.dto";
import { ParseIntPagePipe } from "src/core/common/pipes/ParseIntPage.pipe";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
    BOOK_TAG,
    PHONE_TAG,
    WEB_TAG,
} from "src/core/swagger/constants/swagger.tags";
import ManagerGuard from "src/core/common/guards/manager.guard";
import StudentGuard from "src/core/common/guards/student.guard";
import TeacherGuard from "src/core/common/guards/teacher.guard";
import { BookAttributes } from "./interfaces/book.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@ApiTags(BOOK_TAG, WEB_TAG, PHONE_TAG)
@Controller("books")
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./uploads",
                filename: (req, file, callback) => {
                    const filename = Date.now() + "-" + file.originalname;
                    callback(null, filename);
                },
            }),
        }),
    )
    create(
        @Body() createBookDto: CreateBookDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 100000000 }),
                    new FileTypeValidator({ fileType: "pdf" }),
                ],
            }),
        )
        file?: Express.Multer.File,
    ) {
        if (file) {
            createBookDto.pdf_link = file.path;
        }
        return this.booksService.create(createBookDto);
    }
    @ApiBearerAuth("Authorization")
    @Get()
    findAll(
        @Query() query: FindAllBookDto,
        @Query("page", ParseIntPagePipe) page: number,
    ) {
        return this.booksService.findAll(query, page);
    }
    @ApiBearerAuth("Authorization")
    @Get(":id")
    findOne(@Param("id", ParseIntPipe) book_id: BookAttributes["book_id"]) {
        return this.booksService.findOne({ book_id: book_id });
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) book_id: BookAttributes["book_id"],
        @Body() updateBookDto: UpdateBookDto,
    ) {
        //return updateBookDto;
        return this.booksService.update(+book_id, updateBookDto);
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(ManagerGuard)
    @Delete(":id")
    remove(@Param("id", ParseIntPipe) book_id: BookAttributes["book_id"]) {
        return this.booksService.remove(+book_id);
    }
}
