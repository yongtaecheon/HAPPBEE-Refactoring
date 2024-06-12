import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CatInfoDto } from './dto/catInfo.dto';
import { ChatInfoDto } from './dto/chatInfo.dto';
import { SurveyInfoDto } from './dto/surveyInfo.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAllInfoByUsername(username: string) {
    try {
      const userInfo =
        await this.userRepository.findAllInfoByUsername(username);
      delete userInfo.id;
      delete userInfo.password;
      delete userInfo.catInfo.id;
      delete userInfo.catInfo.user;
      userInfo.chatInfo.forEach((v) => {
        delete v.user;
      });
      userInfo.surveyInfo.forEach((v) => {
        delete v.user;
      });
      return userInfo;
    } catch (e) {
      throw new NotFoundException('해당 사용자가 존재하지 않습니다.');
    }
  }

  //해당하는 info타입에 맞게 수정
  modifyInfo(
    info: string,
    username: string,
    dto: CatInfoDto | ChatInfoDto | SurveyInfoDto,
  ) {
    console.log(dto);
    if (info === 'cat')
      return this.userRepository.updateCatInfo(username, dto as CatInfoDto);
    else if (info === 'chat')
      return this.userRepository.createChatInfo(username, dto as ChatInfoDto);
    else if (info === 'survey')
      return this.userRepository.createSurveyInfo(
        username,
        dto as SurveyInfoDto,
      );
    else throw new BadRequestException('해당 API는 존재하지 않습니다.');
  }
  //해당하는 id의 채팅 내역 삭제
  deleteChatInfo(id: number, username: string) {
    return this.userRepository.deleteChatInfo(id, username);
  }
}
