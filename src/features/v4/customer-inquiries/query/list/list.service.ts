import { Repository } from 'typeorm';
import { injectable, inject } from 'inversify';
import { ListTransform } from './list.transform';
import { TYPES } from '@/shared/constants/type.constant';
import { CustomerInquiry } from '@/database/entities/customer-inquiry.entity';
import { Pagination } from '@/shared/helpers/pagination.helpers';


@injectable()
export class ListService {
  private readonly customerInquiry: Repository<CustomerInquiry>;

  constructor(
    @inject(TYPES.RepositoryCustomerInquiry) customerInquiry: Repository<CustomerInquiry>
  ) {
    this.customerInquiry = customerInquiry;
  }

  async list(req: any): Promise<any> {
    const param = req.query;
    const query = this.customerInquiry.createQueryBuilder('ci');

    const search = param?.search;
    if (search) {
      const arrSearch = ['FullName', 'email','QuestionCategory' ,'Question', 'Reply'];
      arrSearch.forEach((keyArrSearch) => {
        query.orWhere(`ci.${keyArrSearch} LIKE :search`, { search: `%${search}%` });
      });
    }

    const total = await query.getCount();

    query.skip(Pagination.getOffset(req)).take(Pagination.getLimit(req));

    return {
      httpCode: 200,
      data: ListTransform.array(await query.getMany()),
      page: Pagination.getPage(req, total),
    };
  }
}
