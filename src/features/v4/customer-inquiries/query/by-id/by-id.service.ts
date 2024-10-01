import { Repository } from 'typeorm';
import { injectable, inject } from 'inversify';
import { ByIdTransform } from './by-id.transform';
import { TYPES } from '@/shared/constants/type.constant';
import { CustomerInquiry } from '@/database/entities/customer-inquiry.entity';
import { CustomErrorException } from '@/shared/exceptions/custom-error.exception';

@injectable()
export class ByIdService {
  private readonly customerInquiry: Repository<CustomerInquiry>;

  constructor(
    @inject(TYPES.RepositoryCustomerInquiry) customerInquiry: Repository<CustomerInquiry>
  ) {
    this.customerInquiry = customerInquiry;
  }

  async byId(id: number): Promise<any> {
    const query = await this.customerInquiry.findOne({ where: { CustomerInquiryId: id } });
    if (!query) {
      throw new CustomErrorException('data not found', 404);
    }

    return {
      httpCode: 200,
      data: ByIdTransform.object(query),
    };
  }
}
