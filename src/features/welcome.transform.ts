import { BaseTransform } from '@/shared/base/base-transform';
import { ICarImage } from '@/database/entities/icar-image.entity';

export class WelcomeTransform extends BaseTransform {
  transform(icarImage: ICarImage): any {
    return {
      AuctionItemId: icarImage.AuctionItemId,
      ImagePath: icarImage.ImagePath
    };
  }
}
