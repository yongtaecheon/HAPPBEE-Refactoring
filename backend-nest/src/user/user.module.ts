import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SurveyInfoEntity } from './entities/surveyInfo.entity';
import { CatInfoEntity } from './entities/catInfo.entity';
import { ChatInfoEntity } from './entities/chatInfo.entity';
import { AuthService } from './auth.service';

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
  providers: [AuthService, UserService, UserRepository],
})
export class UserModule {}
