import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ChatInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userReq: string;

  @Column()
  aiRes: string;

  @ManyToOne(() => UserEntity, (user) => user.chatInfo)
  user: UserEntity;
}
