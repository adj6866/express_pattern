import { Repository } from 'typeorm';
import { User } from '@/database/entities';
import { injectable, inject } from 'inversify';
import { ByIdTransform } from './by-id.transform';
import { TYPES } from '@/shared/constants/type.constant';
import { BadRequestException } from '@/shared/exceptions';
import { HTTP_STATUS } from '@/shared/constants/http-status.constant';

@injectable()
export class ByIdService {
  constructor(
    @inject(TYPES.RepositoryUser) private readonly user: Repository<User>
  ) {
    this.user = user;
  }

  /**
   * Find a user by given ID.
   *
   * @param id - The ID of the user that will be searched.
   *
   * @throws BadRequestException if the user is not found.
   *
   * @returns An object indicating the query status with an HTTP code,
   *          and the user data if found.
   */
  async byId(id: any) {
    const user = await this.user.findOne({
      where: {
        id: id,
      },
    });

    if (user === null) {
      throw new BadRequestException('data not found');
    }

    return {
      data: ByIdTransform.object(user),
      httpCode: HTTP_STATUS.OK,
    };
  }
}
