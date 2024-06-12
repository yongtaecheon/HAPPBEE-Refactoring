import { IsNotEmpty, IsString } from 'class-validator';

export class ChatInfoDto {
  @IsNotEmpty()
  @IsString()
  userReq: string;

  @IsString()
  aiRes: string;
}
