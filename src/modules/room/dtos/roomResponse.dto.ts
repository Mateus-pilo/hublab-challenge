import { ApiProperty } from '@nestjs/swagger';
import { RoomCreateDto } from './roomCreate.dto';

export class RoomResponseDto extends RoomCreateDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  userCreatedId: string;
}
