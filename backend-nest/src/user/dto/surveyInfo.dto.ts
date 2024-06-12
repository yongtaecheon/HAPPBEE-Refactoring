import { IsNumber } from 'class-validator';

export class SurveyInfoDto {
  @IsNumber()
  totalScore: number;

  @IsNumber()
  olsResult: number;

  @IsNumber()
  economy: number; //경제

  @IsNumber()
  relationship: number; //관계

  @IsNumber()
  freedom: number; //자유

  @IsNumber()
  emotion: number; //감정

  @IsNumber()
  life: number; //삶의 만족도
}
