import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Room } from './schema/room.schema';
import { RoomResponseDto } from './dtos/roomResponse.dto';
import { RoomCreateDto } from './dtos/roomCreate.dto';
import { UserService } from '../user/user.service';
import str from 'src/config/string.config';
@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    private readonly userService: UserService,
  ) {}

  async create(data: RoomCreateDto, userId: string): Promise<RoomResponseDto> {
    const errors = await validate(data);

    if (errors && errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    const roomSchema = await this.roomModel.create({
      ...data,
      userCreatedId: new Types.ObjectId(userId),
    });

    return plainToClass(RoomResponseDto, { ...roomSchema.toObject() });
  }

  async toEnterRoom(roomId: string, userId: string): Promise<RoomResponseDto> {
    const updated = await this.userService.updateUserRoom({
      userId,
      roomImIn: roomId,
    });

    if (!updated?.modifiedCount) {
      throw new HttpException(
        str.DO_NOT_ENTER_IN_THIS_ROOM,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.roomModel
      .findOne({ _id: new Types.ObjectId(roomId) }, { userCreatedId: 0 })
      .lean();
  }
}
