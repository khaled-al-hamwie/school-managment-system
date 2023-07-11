import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ChatGateway } from "./chat.gateway";
import { Message } from "./entities/message.entity";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";

@Module({
    imports: [SequelizeModule.forFeature([Message])],
    controllers: [MessagesController],
    providers: [MessagesService, ChatGateway],
})
export class MessagesModule {}
