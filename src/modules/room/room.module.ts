import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room, RoomSchema } from './schema/room.schema';

@Module({
  imports: [
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
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY_TOKEN,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [RoomController],
  providers: [RoomService, UserService],
})
export class RoomModule {}
