import { IsNotEmpty, IsNumber } from 'class-validator';

export class CatInfoDto {
  @IsNumber()
  @IsNotEmpty()
  selectedItem: number;

  @IsNumber()
  @IsNotEmpty()
  chatCount: number;

  @IsNumber()
  @IsNotEmpty()
  level: number;
}
