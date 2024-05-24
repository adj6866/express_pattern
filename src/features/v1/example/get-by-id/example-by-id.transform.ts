import { ICarImage } from '@/entities/icar-image.entity';
import { BaseTransform } from '@/transforms/base.transform';

export class ExampleByIdTransform extends BaseTransform {
  transform(icarImage: ICarImage): any {
    return {
      AuctionItemId: icarImage.AuctionItemId,
      ImagePath: icarImage.ImagePath
    };
  }
}
