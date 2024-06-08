import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatInfoEntity } from './chatInfo.entity';
import { CatInfoEntity } from './catInfo.entity';
import { SurveyInfoEntity } from './surveyInfo.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => CatInfoEntity)
  @JoinColumn()
  catInfo: CatInfoEntity;

  @OneToMany(() => ChatInfoEntity, (chatInfo) => chatInfo.user)
  chatInfo: ChatInfoEntity[];

  @OneToMany(() => SurveyInfoEntity, (surveyInfo) => surveyInfo.user)
  surveyInfo: SurveyInfoEntity[];
}
