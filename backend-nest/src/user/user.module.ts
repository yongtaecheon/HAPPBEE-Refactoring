import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenService } from '../auth/token.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import { CatInfoEntity } from '../auth/entities/catInfo.entity';
import { ChatInfoEntity } from './entities/chatInfo.entity';
import { SurveyInfoEntity } from './entities/surveyInfo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CatInfoEntity,
      ChatInfoEntity,
      SurveyInfoEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, TokenService, UserRepository],
})
export class UserModule {}
