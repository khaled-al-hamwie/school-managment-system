import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { PhoneGuard } from "src/core/common/guards/phone.guard";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @UseGuards(PhoneGuard)
    @Post()
    create(@Body() createMessageDto: CreateMessageDto) {
        return this.messagesService.create(createMessageDto);
    }

    @Get()
    findAll() {
        return this.messagesService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.messagesService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateMessageDto: UpdateMessageDto,
    ) {
        return this.messagesService.update(+id, updateMessageDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.messagesService.remove(+id);
    }
}
