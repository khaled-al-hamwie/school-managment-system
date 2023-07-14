import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
import { ChatGateway } from "src/core/getway/chat.gateway";
import { GroupsService } from "../groups/groups.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Message } from "./entities/message.entity";
import { MessageAttributes } from "./interfaces/message.interface";

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message) private readonly MessageEntity: typeof Message,
        private readonly chatGateway: ChatGateway,
        private readonly groupsService: GroupsService,
    ) {}
    async create(createMessageDto: CreateMessageDto) {
        const group_exists = await this.groupsService.checkGroup(
            createMessageDto.group_id,
        );
        if (!group_exists) {
            throw new ForbiddenException("Group doesn't exists");
        }
        const message = await this.MessageEntity.create(createMessageDto);
        this.chatGateway.sendMessage(message);
        return "done";
    }

    findAll(options: FindOptions<MessageAttributes>) {
        return this.MessageEntity.findAll(options);
    }
}
