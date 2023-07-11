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
})
export class ChatGateway
    implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger("AppGateway");
    @SubscribeMessage("message")
    handleMessage(@MessageBody() message: string) {
        this.server.emit("message", message);
    }

    afterInit(server: Server) {
        this.logger.log(server);
        //Do stuffs
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        //Do stuffs
    }

    async handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        //Do stuffs
    }
}
