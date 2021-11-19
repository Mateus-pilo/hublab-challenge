import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import str from 'src/config/string.config';

export class RoomCreateDto {
  @ApiProperty()
  @IsDefined({ message: str.MSG_ESTA_DEFINIDO })
  @IsString({ message: str.MSG_E_STRING })
  name: string;
}
