import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class WelcomeDto {
  @IsInt()
  @IsNotEmpty()
  AuctionItemId: number;

  @IsOptional()
  @IsString()
  PoliceNo?: string;
}
