import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { AuthController } from './auth.controller';
import { UserEntity } from './entities/user.entity';
import { CatInfoEntity } from './entities/catInfo.entity';
import { ChatInfoEntity } from 'src/user/entities/chatInfo.entity';
import { SurveyInfoEntity } from 'src/user/entities/surveyInfo.entity';

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
