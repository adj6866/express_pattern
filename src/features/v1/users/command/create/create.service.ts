import { DataSource } from 'typeorm';
import { User } from '@/database/entities';
import { injectable, inject } from 'inversify';
import { TYPES } from '@/shared/constants/type.constant';
import { BadRequestException } from '@/shared/exceptions';
import { HTTP_STATUS } from '@/shared/constants/http-status.constant';
import { DateHelper } from '@/shared/helpers/date.helper';
import { AuthUserInternalRegistration } from '@/events/publishers/auth-user-internal-registration.publish';
import { IDataPublish, IDataUser } from './create.interface';

@injectable()
export class CreateService {
  constructor(
    @inject(TYPES.DataSource) private readonly dataSource: DataSource,
    @inject(AuthUserInternalRegistration)
    private readonly authUserInternalRegistration: AuthUserInternalRegistration
  ) {
    this.dataSource = dataSource;
    this.authUserInternalRegistration = authUserInternalRegistration;
  }

  /**
   * Creates a new user with associated roles and branches.
   *
   * @param req - The request object containing the user and body data.
   *              The body should include user details such as name, email, phone,
   *              isActive status, and roles with associated branches.
   *
   * This method initiates a database transaction to save the user details,
   * assigns roles to the user, and links branches to each role. It handles
   * any errors by throwing a BadRequestException with the error message.
   *
   * @returns An object indicating the creation status with an HTTP code.
   *
   * @throws BadRequestException if any error occurs during the operation.
   */
  async create(req: any) {
    try {
      const user = req.user;
      const body = req.body;
      const dataUser: IDataUser = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        isActive: body.isActive,
        createdAt: DateHelper.formatDefault(),
        createdBy: user.email,
      };

      const userId = await this.dataSource.transaction(async (manager) => {
        const user = await manager.save(User, dataUser);

        return user.id;
      });

      await this.publishToTopic(userId, body);

      return {
        data: null,
        httpCode: HTTP_STATUS.CREATED,
      };
    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';
      throw new BadRequestException(errorMessage as any);
    }
  }

  private async publishToTopic(body: any, userId: string): Promise<void> {
    const dataPublish: IDataPublish = {
      userId: userId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      roles: body.roles,
    };
    await this.authUserInternalRegistration.publish(dataPublish);
  }
}
