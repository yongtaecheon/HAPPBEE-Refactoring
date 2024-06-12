import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SurveyInfoEntity } from './entities/surveyInfo.entity';
import { CatInfoEntity } from './entities/catInfo.entity';
import { ChatInfoEntity } from './entities/chatInfo.entity';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CatInfoEntity,
      ChatInfoEntity,
      SurveyInfoEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [TokenService, AuthService, AuthRepository],
})
export class AuthModule {}
