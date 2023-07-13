import { Module } from "@nestjs/common";
import { MessagesModule } from "src/modules/messages/messages.module";
import { ChatGateway } from "./chat.gateway";
@Module({
    // imports: [WebSocketModule],
    imports: [MessagesModule],
    providers: [ChatGateway],
})
export class GetewayModule {}
