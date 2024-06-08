import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private userRepository: Repository<UserEntity>;
  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }
}
