import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import str from 'src/config/string.config';
import { UserResponseDto } from './userResponse.dto';

export class UserCreateDto extends UserResponseDto {
  @ApiProperty()
  @IsString({ message: str.MSG_E_STRING })
  password: string;
}
