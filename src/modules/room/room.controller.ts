import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserId } from 'src/decorators/getUserId.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RoomCreateDto } from './dtos/roomCreate.dto';
import { RoomResponseDto } from './dtos/roomResponse.dto';
import { RoomService } from './room.service';

@Controller('room')
@ApiTags('Room')
@ApiBearerAuth('authorization')
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: 'Create a room' })
  @ApiOkResponse({ type: RoomResponseDto })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiInternalServerErrorResponse({ type: HttpException })
  @ApiBody({ type: RoomCreateDto })
  @Post('')
  async createUser(
    @Body() dtoRoom: RoomCreateDto,
    @GetUserId() userId: string,
  ): Promise<RoomResponseDto> {
    return this.roomService.create(dtoRoom, userId);
  }

  @ApiOperation({ summary: 'To enter a room' })
  @ApiOkResponse({ type: RoomResponseDto })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiInternalServerErrorResponse({ type: HttpException })
  @Post('enter/:roomId')
  async toEnterRoom(
    @Param('roomId') roomId: string,
    @GetUserId() userId: string,
  ): Promise<RoomResponseDto> {
    return this.roomService.toEnterRoom(roomId, userId);
  }
}
