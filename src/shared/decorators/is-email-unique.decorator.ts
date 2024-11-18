import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '@/database/entities';
import { container } from '@/utils/inversify.util';
import { TYPES } from '@/shared/constants/type.constant';

@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  private readonly user: Repository<User>;

  constructor() {
    this.user = container.get<Repository<User>>(TYPES.RepositoryUser);
  }

  async validate(email: string) {
    const user = await this.user.findOne({ where: { email } });
    return !user;
  }

  defaultMessage() {
    return 'Email $value is already taken';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
