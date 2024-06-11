import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  //회원가입
  async signIn(userDto: UserDto) {
    try {
      await this.userRepository.findOneByUsername(userDto.username);
    } catch (e) {
      //유저가 존재하지 않을 때 삽입
      return {
        username: (await this.userRepository.createUser(userDto)).username,
      };
    }
    //유저가 존재할 경우 bad request
    throw new BadRequestException('해당 유저가 이미 존재합니다.');
  }

  //로그인시 비밀번호 검증
  async authPassword(userDto: UserDto) {
    return {
      username: (await this.userRepository.authPassword(userDto)).username,
    };
  }

  findAllInfoByUsername(username: string) {
    return this.userRepository.findAllInfoByUsername(username);
  }

  //해당 유저 존재하면 username 반환
  async isUserExist(username: string) {
    return {
      username: (await this.userRepository.findOneByUsername(username))
        .username,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
