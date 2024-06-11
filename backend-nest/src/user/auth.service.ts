import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  //환경변수에서 JWT 시크릿 키 가져오기
  private getSecretKey(which: string) {
    if (which === 'access')
      return this.configService.get('JWT_ACCESS_SECRET_KEY');
    else if (which === 'refresh')
      return this.configService.get('JWT_REFRESH_SECRET_KEY');
  }

  //토큰 발급
  publishTokens(username: string, res: Response) {
    const issuer = 'happ_backend_nest';
    const cookieOptions = {
      secure: false, //http 접근허용
      httpOnly: true, //XSS 차단
    };

    const accessToken = jwt.sign({ username }, this.getSecretKey('access'), {
      expiresIn: '10m', //유효시간 10분
      issuer,
    });
    const refreshToken = jwt.sign({ username }, this.getSecretKey('refresh'), {
      expiresIn: '48h',
      issuer,
    });

    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);
    return { username };
  }

  //토큰 삭제
  clearTokens(res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return '성공적으로 로그아웃 하였습니다.';
  }

  //액세스 토큰 검증
  authAccessToken(req: Request) {
    const token = req.cookies.accessToken;
    const tokenPayload = jwt.verify(
      token,
      this.getSecretKey('access'),
    ) as jwt.JwtPayload;
    return { username: tokenPayload.username };
  }

  //리프레시 토큰 검증
  //인증 될 경우 액세스 토큰 재발급과 동시에 리프레시 토큰도 재발급
  authRefreshToken(req: Request, res: Response) {
    const token = req.cookies.refreshToken;
    const tokenPayload = jwt.verify(
      token,
      this.getSecretKey('refresh'),
    ) as jwt.JwtPayload;
    return this.publishTokens(tokenPayload.username, res);
  }

  //토큰 검증
  //액세스 토큰 검증 후 만료되면 리프레시 토큰 검증
  authTokens(req: Request, res: Response) {
    try {
      return this.authAccessToken(req);
    } catch (e) {
      try {
        return this.authRefreshToken(req, res);
      } catch (e) {
        throw new InternalServerErrorException(
          '토큰이 만료되었거나 존재하지 않습니다. 로그인을 다시 진행해주세요.',
        );
      }
    }
  }
}
