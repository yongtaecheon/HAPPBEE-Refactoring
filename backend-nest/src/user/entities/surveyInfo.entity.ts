import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class SurveyInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalScore: number;

  @Column()
  olsResult: number;

  @Column()
  economy: number; //경제

  @Column()
  relationship: number; //관계

  @Column()
  freedom: number; //자유

  @Column()
  emotion: number; //감정

  @Column()
  life: number; //삶의 만족도

  @ManyToOne(() => UserEntity, (user) => user.surveyInfo)
  user: UserEntity;
}
