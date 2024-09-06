import { TransformBase } from '@/shared/base/transform.base';
import { ICarImage } from '@/infrastructures/database/entities/icar-image.entity';

export class WelcomeTransform extends TransformBase {
  transform(icarImage: ICarImage): any {
    return {
      AuctionItemId: icarImage.AuctionItemId,
      ImagePath: icarImage.ImagePath
    };
  }
}
