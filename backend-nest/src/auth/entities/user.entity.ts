import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CatInfoEntity } from './catInfo.entity';
import { ChatInfoEntity } from '../../user/entities/chatInfo.entity';
import { SurveyInfoEntity } from '../../user/entities/surveyInfo.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => CatInfoEntity, (catInfo) => catInfo.user, { eager: false })
  //eager: true 유저엔티티 로드 자동조인
  @JoinColumn()
  //OnetoOne은 한 쪽에 JoinColumn() 명시해야 함
  catInfo: CatInfoEntity;

  @OneToMany(() => ChatInfoEntity, (chatInfo) => chatInfo.user)
  chatInfo: ChatInfoEntity[];

  @OneToMany(() => SurveyInfoEntity, (surveyInfo) => surveyInfo.user)
  surveyInfo: SurveyInfoEntity[];
}
