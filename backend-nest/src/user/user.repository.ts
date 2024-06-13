import { SurveyInfoDto } from './dto/surveyInfo.dto';
import { CatInfoDto } from './dto/catInfo.dto';
import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/auth/entities/user.entity';
import { CatInfoEntity } from 'src/auth/entities/catInfo.entity';
import { ChatInfoEntity } from './entities/chatInfo.entity';
import { SurveyInfoEntity } from './entities/surveyInfo.entity';
import { ChatInfoDto } from './dto/chatInfo.dto';

@Injectable()
export class UserRepository {
  private userRepository: Repository<UserEntity>;
  private catInfoRepository: Repository<CatInfoEntity>;
  private chatInfoRepository: Repository<ChatInfoEntity>;
  private surveyInfoRepository: Repository<SurveyInfoEntity>;
  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
    this.catInfoRepository = this.dataSource.getRepository(CatInfoEntity);
    this.chatInfoRepository = this.dataSource.getRepository(ChatInfoEntity);
    this.surveyInfoRepository = this.dataSource.getRepository(SurveyInfoEntity);
  }

  //유저 이름으로 해당 UserEntity, CatEntity 찾기
  async findOneByUsername(username: string) {
    const result = await this.userRepository.findOneBy({ username });
    // console.log('findOneByUsername : ', result);
    return result;
  }

  //유저이름으로 정보 모두 찾기
  async findAllInfoByUsername(username: string) {
    const user = await this.findOneByUsername(username);
    const catInfo = await this.catInfoRepository.find({
      where: { user },
      relations: { user: true },
    });
    const chatInfo = await this.chatInfoRepository.find({
      where: { user },
      relations: { user: true },
    });
    const surveyInfo = await this.surveyInfoRepository.find({
      where: { user },
      relations: { user: true },
    });
    console.log('chatInfo : ', chatInfo);
    console.log('surveyInfo : ', surveyInfo);
    return {
      ...user,
      catInfo: catInfo[0],
      chatInfo,
      surveyInfo: surveyInfo,
    };
  }
  //햅비냥 정보 업데이트
  async updateCatInfo(username: string, catInfoDto: CatInfoDto) {
    const user = await this.findOneByUsername(username);
    await this.catInfoRepository.update({ id: user.id }, catInfoDto);
    return 'catInfo updated';
  }
  //채팅 내역 추가
  async createChatInfo(username: string, chatInfoDto: ChatInfoDto) {
    const user = await this.findOneByUsername(username);
    const chatInfo = await this.chatInfoRepository.save({
      ...chatInfoDto,
      user,
    });
    console.log('new ChatInfo created : ', chatInfo);
    return 'chatInfo created';
  }
  // 설문 내역 추가
  async createSurveyInfo(username: string, surveyInfoDto: SurveyInfoDto) {
    const user = await this.findOneByUsername(username);
    const surveyInfo = await this.surveyInfoRepository.save({
      ...surveyInfoDto,
      user,
    });
    console.log('new SurveyInfo created : ', surveyInfo);
    return 'surveyInfo created';
  }

  async deleteChatInfo(id: number, username: string) {
    const user = await this.findOneByUsername(username);
    try {
      const deleteRow = await this.chatInfoRepository.findOne({
        where: { user, id }, //해당 유저의 해당 id의 채팅내역
        relations: { user: true },
      });
      const chatInfo = await this.chatInfoRepository.remove(deleteRow);
      console.log('delete ChatInfo : ', chatInfo);
      return 'chatInfo deleted';
    } catch (e) {
      throw new NotFoundException('해당 채팅 내역이 존재하지 않습니다.');
    }
  }
}
