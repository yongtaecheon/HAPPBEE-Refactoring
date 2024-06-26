import { DataSource, Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { AuthDto } from './auth.dto';
import { CatInfoEntity } from './entities/catInfo.entity';

/*
insert :  값이 없으면 데이터를 저장, 값이 존재하면 duplicate 오류를 발생
save : 값이 없으면 insert로 데이터를 저장, 값이 존재하면 덮어씀. 저장된 값을 select해서 리턴
update: 바꾸고 싶은 특정 필드만 수정

속도 : update > save > insert
*/

@Injectable()
export class AuthRepository {
  private userRepository: Repository<UserEntity>;
  private catInfoRepository: Repository<CatInfoEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
    this.catInfoRepository = this.dataSource.getRepository(CatInfoEntity);
  }
  async createUser(authDto: AuthDto) {
    //유저 생성
    const user = await this.userRepository.save(authDto);
    const catInfo = await this.catInfoRepository.save({
      selectedItem: -1,
      chatCount: 0,
      level: 0,
      user: user,
    });
    console.log('createUser : ', user);
    console.log('catInfo : ', catInfo);
    return user;
  }

  async authPassword(authDto: AuthDto) {
    const user = await this.findOneByUsername(authDto.username);
    if (user.password !== authDto.password)
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    return user;
  }

  //유저 이름으로 해당 UserEntity, CatEntity 찾기
  async findOneByUsername(username: string) {
    const result = await this.userRepository.findOneBy({ username });
    console.log('findOneByUsername : ', result);
    return result;
  }
}
