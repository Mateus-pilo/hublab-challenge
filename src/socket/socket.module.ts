import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from 'src/modules/room/room.module';
import { RoomService } from 'src/modules/room/room.service';
import { Room, RoomSchema } from 'src/modules/room/schema/room.schema';
import { User, UserSchema } from 'src/modules/user/schema/user.schema';
import { UserModule } from 'src/modules/user/user.module';
import { UserService } from 'src/modules/user/user.service';
import { SocketGateway } from './socketGateway.socket';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    RoomModule,
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY_TOKEN,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [],
  providers: [SocketGateway, RoomService, UserService],
})
export class SocketModule {}
