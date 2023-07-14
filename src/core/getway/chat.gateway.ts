import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { MessageAttributes } from "src/modules/messages/interfaces/message.interface";

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server: Server;
    sendMessage(
        message: MessageAttributes["message"],
        group_id: MessageAttributes["group_id"],
    ) {
        this.server.emit(`group-${group_id}`, message);
    }
}
