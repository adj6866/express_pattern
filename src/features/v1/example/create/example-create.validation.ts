import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ExampleValidation {
  @IsInt()
  @IsNotEmpty()
  AuctionItemId: number;

  @IsOptional()
  @IsString()
  PoliceNo?: string;

  // Tambahkan properti lain dan validasi sesuai kebutuhan
}
