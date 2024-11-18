import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: any) {
    const object = args.object as any;
    return confirmPassword === object.password; // check if the passwords match
  }

  defaultMessage() {
    return 'Passwords do not match'; // default error message
  }
}

export function IsPasswordMatch(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordMatchConstraint,
    });
  };
}
