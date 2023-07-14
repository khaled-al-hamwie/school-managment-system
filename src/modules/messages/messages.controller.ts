import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { User } from "src/core/common/decorators/user.decorator";
import { PhoneGuard } from "src/core/common/guards/phone.guard";
import { ParseIntPagePipe } from "src/core/common/pipes/ParseIntPage.pipe";
import { Credential } from "../credentials/entities/credential.entity";
import Student from "../students/entities/student.entity";
import { StudentAttributes } from "../students/interfaces/student.interface";
import Teacher from "../teachers/entities/teacher.entity";
import { TeacherAttributes } from "../teachers/interfaces/teacher.interface";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageAttributes } from "./interfaces/message.interface";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @UseGuards(PhoneGuard)
    @Post()
    create(
        @Body() createMessageDto: CreateMessageDto,
        @User("student_id") student_id: StudentAttributes["student_id"],
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
    ) {
        student_id
            ? (createMessageDto["student_id"] = student_id)
            : (createMessageDto["teacher_id"] = teacher_id);
        return this.messagesService.create(createMessageDto);
    }

    @UseGuards(PhoneGuard)
    @Get(":group_id")
    findAll(
        @Param("group_id", ParseIntPipe)
        group_id: MessageAttributes["group_id"],
        @User("student_id") student_id: StudentAttributes["student_id"],
        @User("teacher_id") teacher_id: TeacherAttributes["teacher_id"],
        @Query("page", ParseIntPagePipe) page: number,
    ) {
        return this.messagesService.findAll({
            where: { group_id },
            order: [["created_at", "DESC"]],
            offset: page * 50,
            limit: 50,
            attributes: {
                exclude: student_id ? ["teacher_id"] : ["student_id"],
            },
            include: [
                {
                    model: student_id ? Student : Teacher,
                    attributes: ["first_name", "last_name"],

                    include: [
                        {
                            model: Credential,
                            attributes: ["user_name"],
                        },
                    ],
                },
            ],
        });
    }
}
