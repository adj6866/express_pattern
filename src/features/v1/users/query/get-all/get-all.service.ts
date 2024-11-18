import { Repository, Like } from 'typeorm';
import { User } from '@/database/entities';
import { injectable, inject } from 'inversify';
import { GetAllTransform } from './get-all.transform';
import { TYPES } from '@/shared/constants/type.constant';
import { Pagination } from '@/shared/helpers/pagination.helper';
import { HTTP_STATUS } from '@/shared/constants/http-status.constant';

@injectable()
export class GetALlService {
  constructor(
    @inject(TYPES.RepositoryUser) private readonly user: Repository<User>
  ) {
    this.user = user;
  }

  /**
   * Get all roles
   * @param req Express Request
   * @returns Promise<{ page: number, data: Role[], httpCode: number }>
   */
  async getAll(req: any) {
    const param = req.query;
    const search = param?.search;
    const field = param?.searchBy;

    let whereConditions: any = {};
    if (search) {
      whereConditions = {
        ...whereConditions,
        [field]: Like(`%${search}%`),
      };
    }

    let order = param.order ?? 'createdAt';
    let sort = param.sort ?? 'desc';

    const [data, total] = await this.user.findAndCount({
      where: whereConditions,
      skip: Pagination.getOffset(req),
      take: Pagination.getLimit(req),
      order: { [order]: sort },
    });

    return {
      page: Pagination.getPage(req, total),
      data: GetAllTransform.array(data),
      httpCode: HTTP_STATUS.OK,
    };
  }
}
