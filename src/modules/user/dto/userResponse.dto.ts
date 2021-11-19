import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';
import str from 'src/config/string.config';

export class UserResponseDto {
  _id?: string;

  @ApiProperty()
  @IsString({ message: str.MSG_E_STRING })
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail({})
  @IsString()
  email: string;
}
