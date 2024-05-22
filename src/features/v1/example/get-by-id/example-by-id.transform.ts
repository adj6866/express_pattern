import { ICarImage } from '@/entities/icar-image.entity';

export class ExampleByIdTransform {
  static transform(icarImage: ICarImage): any {
    return {
      AuctionItemId: icarImage.AuctionItemId as number,
      ImagePath: icarImage.ImagePath as string
    };
  }

  static transformArray(icarImages: ICarImage[]): any[] {
    return icarImages.map(ExampleByIdTransform.transform);
  }
}
