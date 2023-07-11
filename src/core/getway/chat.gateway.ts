import { Logger } from "@nestjs/common";
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

@WebSocketGateway({
    cors: {
        origin: "*",
    },
    credentials: true,
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger("AppGateway");
    @SubscribeMessage("message")
    handleMessage(@MessageBody() message: string) {
        this.server.emit("message", message);
    }
}
