import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ExampleCreateDto {
  @IsInt()
  @IsNotEmpty()
  AuctionItemId: number;

  @IsOptional()
  @IsString()
  PoliceNo?: string;
}
