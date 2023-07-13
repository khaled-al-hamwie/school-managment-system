import { Logger, OnModuleInit } from "@nestjs/common";
import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessagesService } from "src/modules/messages/messages.service";

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
    constructor(private readonly messagesService: MessagesService) {}
    @WebSocketServer()
    server: Server;
    onModuleInit() {
        this.server.on("connection", (socket) => {
            console.log(socket.id);
            console.log("connection");
        });
    }
    @SubscribeMessage("sendMessage")
    handleMessage(@MessageBody() message: string) {
        console.log(message);
        this.server.emit("reciveMessage", message);
    }
}
