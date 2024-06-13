import { UserEntity } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SurveyInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalScore: number;

  @Column()
  olsResult: number;

  @Column('decimal', { precision: 6, scale: 3 })
  economy: number; //경제

  @Column('decimal', { precision: 6, scale: 3 })
  relationship: number; //관계

  @Column('decimal', { precision: 6, scale: 3 })
  freedom: number; //자유

  @Column('decimal', { precision: 6, scale: 3 })
  emotion: number; //감정

  @Column('decimal', { precision: 6, scale: 3 })
  life: number; //삶의 만족도

  @ManyToOne(() => UserEntity, (user) => user.surveyInfo)
  user: UserEntity;
}
