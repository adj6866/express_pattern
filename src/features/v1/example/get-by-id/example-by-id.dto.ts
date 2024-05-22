import { Expose } from 'class-transformer';

export class ExampleByIdDto {
  @Expose()
  AuctionItemId: number;

  @Expose()
  ImageName: string;

  @Expose()
  ImagePath: string;
}
