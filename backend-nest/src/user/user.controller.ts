import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Req,
  Res,
  Post,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { TokenService } from 'src/auth/token.service';
import { CatInfoDto } from './dto/catInfo.dto';
import { ChatInfoDto } from './dto/chatInfo.dto';
import { SurveyInfoDto } from './dto/surveyInfo.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  //유저정보 가져오기
  //프런트엔드 최소 마운트 시(새로고침 등) 해당 요청통해 정보 로드
  //토큰 검증 후 토큰 내부의 username을 통해 DB 탐색
  @Get('/info')
  async findAllInfoByUsername(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const username = this.tokenService.authTokens(req, res).username;
    return await this.userService.findAllInfoByUsername(username);
  }

  //햅비냥 정보 업데이트
  @Patch('/update/cat')
  updateCatInfo(
    @Body() catInfoDto: CatInfoDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const username = this.tokenService.authTokens(req, res).username;
    return this.userService.modifyInfo('cat', username, catInfoDto);
  }

  //채팅 내역 추가, 설문 내역 추가
  @Post('/create/:info')
  createInfo(
    @Param('info') info: string,
    @Body() dto: ChatInfoDto | SurveyInfoDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const username = this.tokenService.authTokens(req, res).username;
    return this.userService.modifyInfo(info, username, dto);
  }

  //해당하는 id의 채팅 내역 지우기
  @Delete('/delete/chat/:id')
  deleteChatInfo(
    @Param('id') id: number,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const username = this.tokenService.authTokens(req, res).username;
    return this.userService.deleteChatInfo(id, username);
  }
}
