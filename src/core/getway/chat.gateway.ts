import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Message } from "src/modules/messages/entities/message.entity";
import { MessageAttributes } from "src/modules/messages/interfaces/message.interface";

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server: Server;
    sendMessage(message: Message) {
        this.server.emit(`group-${message.group_id}`, message);
    }
}
