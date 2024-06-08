import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
