import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  //회원가입
  async signIn(authDto: AuthDto) {
    //유저가 존재하지 않을 때 삽입
    if (
      (await this.authRepository.findOneByUsername(authDto.username)) === null
    ) {
      return {
        username: (await this.authRepository.createUser(authDto)).username,
      };
    }
    //유저가 존재할 경우 bad request
    throw new BadRequestException('해당 유저가 이미 존재합니다.');
  }

  //로그인시 비밀번호 검증
  async authPassword(authDto: AuthDto) {
    return {
      username: (await this.authRepository.authPassword(authDto)).username,
    };
  }

  findAllInfoByUsername(username: string) {
    return this.authRepository.findAllInfoByUsername(username);
  }

  //해당 사용자명 존재하는지 확인
  async isUsernameAvailable(username: string) {
    if ((await this.authRepository.findOneByUsername(username)) === null)
      return true;
    return false;
  }
}
