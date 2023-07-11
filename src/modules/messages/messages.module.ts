import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ChatGateway } from "../../core/getway/chat.gateway";
import { Message } from "./entities/message.entity";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";

@Module({
    imports: [SequelizeModule.forFeature([Message])],
    controllers: [MessagesController],
    providers: [MessagesService],
})
export class MessagesModule {}
