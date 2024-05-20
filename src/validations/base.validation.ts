import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UnprocessableEntityException } from '../exceptions/unprocessable-entity.exception';
import { Request, Response, NextFunction } from 'express';

export function BaseValidation(type: any): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, _res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(type, req.body);

    validate(dtoInstance).then((errors) => {
      if (errors.length > 0) {
        const errorFields = errors.map((element) => ({
          field: element.property,
          message: Object.values(element.constraints),
        }));

        return next(new UnprocessableEntityException(errorFields, 422));
      }

      next();
    }).catch(next);
  };
}
