import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
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
    throw new BadRequestException();
  }

  login(userDto: UserDto) {
    return 'login';
  }

  async findAllInfoByUsername(username: string) {
    return this.userRepository.findAllInfoByUsername(username);
  }

  async isUserExist(username: string) {
    //존재하면 유저네임 리턴
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
