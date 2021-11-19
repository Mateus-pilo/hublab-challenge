import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';
import str from 'src/config/string.config';

export class LoginDto {
  @ApiProperty()
  @IsEmail({}, { message: str.MSG_E_EMAIL })
  email: string;

  @ApiProperty()
  @IsString({ message: str.MSG_E_STRING })
  @IsDefined({ message: str.MSG_ESTA_DEFINIDO })
  password: string;
}
