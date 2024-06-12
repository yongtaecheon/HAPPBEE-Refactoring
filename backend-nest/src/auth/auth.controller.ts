import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Request, Response } from 'express';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  //회원가입
  //유저네임 중복확인 후 DB에 유저 생성
  @Post('/signin')
  async signIn(@Body() authDto: AuthDto): Promise<{ username: string }> {
    return await this.authService.signIn(authDto);
  }

  //해당 유저 존재하면 username 반환
  @Get('/exist/:username')
  async isUsernameAvailable(@Param('username') username: string) {
    return await this.authService.isUsernameAvailable(username);
  }

  //로그인
  //비밀번호 검증 후 토큰 발행
  @Post('/login')
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ username: string }> {
    return this.tokenService.publishTokens(
      (await this.authService.authPassword(authDto)).username,
      res,
    );
  }

  //토큰을 통한 자동 로그인 요청
  @Post('/login/token')
  tokenLogin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.tokenService.authTokens(req, res);
  }

  //로그아웃
  //토큰 삭제
  @Delete('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.tokenService.clearTokens(res);
  }
}
