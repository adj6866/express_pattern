import { Request, Response, NextFunction } from 'express';
import { CustomErrorException } from './custom-error.exception';
import * as Sentry from '@sentry/node';
import { UnprocessableEntityException } from './unprocessable-entity.exception';
import { HttpStatus } from '../constants/http-status.contant';

export function HandlerException(err: Error, _req: Request, res: Response, next: NextFunction) {
  let httpCode = 0;
  let message = '';

  switch (true) {
    case err instanceof UnprocessableEntityException: {
      httpCode = 422;

      res.status(httpCode).json({
        transactionId: '0f06b466-99dd-4f59-a5df-1ad9f2a84d0a',
        code: '',
        data: null,
        message: HttpStatus[httpCode],
        errors: (err as UnprocessableEntityException).errors,
      });

      break;
    }

    case err instanceof CustomErrorException: {
      httpCode = (err as CustomErrorException).httpCode;
      message = err.message;
      break;
    }

    default: {
      httpCode = 500;
      message = err.message;
      break;
    }
  }

  if (httpCode >= 500) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    });

    Sentry.captureMessage(message);
    Sentry.captureException(err);
  }

  res.status(httpCode).json({
    transactionId: '0f06b466-99dd-4f59-a5df-1ad9f2a84d0a',
    code: '',
    data: null,
    message: HttpStatus[httpCode],
    errors: err,
  });

  next();
}
