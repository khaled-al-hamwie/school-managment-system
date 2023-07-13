import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ChatGateway } from "src/core/getway/chat.gateway";
import { GroupsService } from "../groups/groups.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Message } from "./entities/message.entity";

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
        await this.MessageEntity.create(createMessageDto);
    }

    findAll() {
        return `This action returns all messages`;
    }

    findOne(id: number) {
        return `This action returns a #${id} message`;
    }

    update(id: number, updateMessageDto: UpdateMessageDto) {
        return `This action updates a #${id} message`;
    }

    remove(id: number) {
        return `This action removes a #${id} message`;
    }
}
