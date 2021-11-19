import { Body, Controller, HttpException, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { TokenResponse } from './dto/tokenResponse.dto';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiInternalServerErrorResponse({ type: HttpException })
  @ApiBody({ type: UserCreateDto })
  @Post('')
  async createUser(@Body() dtoUser: UserCreateDto): Promise<UserResponseDto> {
    return this.userService.create(dtoUser);
  }
  @ApiOperation({ summary: 'Login User' })
  @ApiOkResponse({ type: TokenResponse })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiInternalServerErrorResponse({ type: HttpException })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    return this.userService.login(loginDto);
  }
}
