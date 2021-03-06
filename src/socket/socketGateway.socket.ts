/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { RoomService } from 'src/modules/room/room.service';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private roomService: RoomService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('Socket');

  @SubscribeMessage('msgToServer')
  handleMessage(
    client: Socket,
    message: { senderId: string; roomId: string; message: string },
  ): void {
    this.server.to(message.roomId).emit('msgToClient', message.message);
  }

  @SubscribeMessage('enterRoom')
  async handleEnterRoom(
    client: Socket,
    message: { roomId: string; userId: string },
  ) {
    this.logger.log(`Enter in Room: ${message.roomId}`);
    client.join(message.roomId);
    client.emit('enterRoom', message.roomId);
    await this.roomService.toEnterRoom(message.roomId, message.userId);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    client: Socket,
    message: { userId: string; roomId: string },
  ) {
    this.logger.log(`Leave Room: ${message.roomId}`);
    client.leave(message.roomId);
    client.emit('leaveRoom', message.roomId);
    await this.roomService.toEnterRoom(null, message.userId);
  }

  afterInit(server: Server) {
    this.logger.log('Init Socket');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
