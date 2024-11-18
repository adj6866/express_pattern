import { User } from '@/database/entities';
import { BaseTransform } from '@/shared/base';
import { DateHelper } from '@/shared/helpers/date.helper';

export class ByIdTransform extends BaseTransform {
  transform(user: User): any {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      provider: user.provider,
      name: user.name,
      isActive: user.isActive,
      createdAt: user.createdAt ? DateHelper.formatDefault(user.createdAt) : '',
      createdBy: user.createdBy,
      updatedAt: user.updatedAt ? DateHelper.formatDefault(user.updatedAt) : '',
      updatedBy: user.updatedBy,
      deletedAt: user.deletedAt ? DateHelper.formatDefault(user.deletedAt) : '',
      deletedBy: user.deletedBy,
    };
  }
}
