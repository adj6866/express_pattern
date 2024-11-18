import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Role } from '@/database/entities';
import { container } from '@/utils/inversify.util';
import { TYPES } from '@/shared/constants/type.constant';

@ValidatorConstraint({ async: true })
export class IsRoleUniqueConstraint implements ValidatorConstraintInterface {
  private readonly role: Repository<Role>;

  constructor() {
    this.role = container.get<Repository<Role>>(TYPES.RepositoryRole);
  }

  async validate(roleName: string) {
    const nameFormat = roleName.toUpperCase().replace(/ /g, '_');
    const role = await this.role.findOne({ where: { name: nameFormat } });
    return !role;
  }

  defaultMessage() {
    return 'Role name $value is already taken';
  }
}

export function IsRoleUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoleUniqueConstraint,
    });
  };
}
