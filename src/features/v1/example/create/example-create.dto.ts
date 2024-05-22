import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ExampleCreateDto {
  @IsInt()
  @IsNotEmpty()
  @Expose()
  AuctionItemId: number;

  @IsOptional()
  @IsString()
  @Expose()
  PoliceNo?: string;
}
