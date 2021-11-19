import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RoomModule } from './modules/room/room.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@mongodb:27017/${process.env.DATABASE_MONGO}`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
    UserModule,
    RoomModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
