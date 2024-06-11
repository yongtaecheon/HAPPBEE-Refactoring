import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class CatInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  selectedItem: number;

  @Column()
  chatCount: number;

  @Column()
  level: number;

  @OneToOne(() => UserEntity, (user) => user.catInfo)
  user: UserEntity;
}
