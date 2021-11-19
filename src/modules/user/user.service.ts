import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateWriteOpResult } from 'mongoose';
import { UserCreateDto } from './dto/userCreate.dto';
import { User } from './schema/user.schema';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/userResponse.dto';
import { plainToClass } from 'class-transformer';
import { LoginDto } from './dto/login.dto';
import str from 'src/config/string.config';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from './dto/tokenResponse.dto';
import { UpdateUserRoom } from './interfaces/updateUserRoom.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(data: UserCreateDto): Promise<UserResponseDto> {
    const errors = await validate(data);

    if (errors && errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    data.password = bcrypt.hashSync(data.password, 10);

    const userSchema = await this.userModel.create(data);

    const user = userSchema.toObject();

    delete user.password;
    return plainToClass(UserResponseDto, { ...user });
  }

  async login(loginDto: LoginDto): Promise<TokenResponse> {
    const errors = await validate(loginDto);
    if (errors && errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.findOne({ email: loginDto.email }).lean();

    if (!user) {
      throw new HttpException(str.VERIFY_YOUR_EMAIL, HttpStatus.NOT_FOUND);
    }

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new HttpException(str.INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
    }

    return { token: await this.jwtService.signAsync(user), expiresIn: 60000 };
  }

  async updateUserRoom(data: UpdateUserRoom): Promise<UpdateWriteOpResult> {
    return await this.userModel.updateOne(
      {
        _id: new Types.ObjectId(data.userId),
      },
      {
        roomImIn: data.roomImIn,
      },
    );
  }
}
