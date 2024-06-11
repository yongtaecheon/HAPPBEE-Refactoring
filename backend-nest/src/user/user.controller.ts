import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  //회원가입
  //유저네임 중복확인 후 DB에 유저 생성
  @Post('/signin')
  async signIn(@Body() userDto: UserDto): Promise<{ username: string }> {
    return await this.userService.signIn(userDto);
  }

  //해당 유저 존재하면 username 반환
  @Get('/exist/:username')
  async isUsernameAvailable(@Param('username') username: string) {
    return await this.userService.isUsernameAvailable(username);
  }

  //로그인
  //비밀번호 검증 후 토큰 발행
  @Post('/login')
  async login(
    @Body() userDto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ username: string }> {
    return this.authService.publishTokens(
      (await this.userService.authPassword(userDto)).username,
      res,
    );
  }

  //토큰을 통한 자동 로그인 요청
  @Post('/login/token')
  tokenLogin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.authTokens(req, res);
  }

  //로그아웃
  //토큰 삭제
  @Delete('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.clearTokens(res);
  }

  //유저정보 가져오기
  //토큰 검증 후 토큰 내부의 username을 통해 DB 탐색
  @Get('/info')
  async findAllInfoByUsername(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const username = this.authService.authTokens(req, res).username;
    return await this.userService.findAllInfoByUsername(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
