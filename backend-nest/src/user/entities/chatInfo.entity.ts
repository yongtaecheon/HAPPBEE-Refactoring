import { UserEntity } from '../../auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
