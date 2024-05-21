import { Repository } from 'typeorm';
import { injectable, inject } from 'inversify';
import { TYPES } from '@/constants/types.constant';
import { ICarImage } from '@/entities/icar-image.entity';

@injectable()
export class ExampleByIdService {
  private readonly icarImage: Repository<ICarImage>;

  constructor(
    @inject(TYPES.RepositoryICarImage) icarImageRepository: Repository<ICarImage>
  ) {
    this.icarImage = icarImageRepository;
  }

  async getById(): Promise<any> {
    const icarImage =  await this.icarImage.find({
      where: {
        AuctionItemId: 11312
      }
    });

    return {
      httpCode: 200,
      data: icarImage,
      page: {
        skip: 1,
        limit: 10
      }
    };
  }
}
