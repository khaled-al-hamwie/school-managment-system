import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { GetewayModule } from "src/core/getway/geteway.module";
import { GroupsModule } from "../groups/groups.module";
import { Message } from "./entities/message.entity";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Message]),
        GetewayModule,
        GroupsModule,
    ],
    controllers: [MessagesController],
    providers: [MessagesService],
    exports: [MessagesService],
})
export class MessagesModule {}
