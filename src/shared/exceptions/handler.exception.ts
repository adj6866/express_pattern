import * as Sentry from '@sentry/node';
import { Request, Response, NextFunction } from 'express';
import { CustomErrorException } from './custom-error.exception';
import { HTTP_MESSAGE } from '@/shared/constants/http-status.constant';
import { UnprocessableEntityException } from './unprocessable-entity.exception';
import { BadRequestException } from './bad-request.exception';
import { ForbiddenException } from './forbidden.exception';
import { InternalServerErrorException } from './internal-server-error.exception';
import { ServiceUnavailableException } from './service-unavailable.exception';

export function HandlerException(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  let httpCode = 0;
  let message = '';
  let errors: any;

  switch (true) {
    case err instanceof UnprocessableEntityException: {
      httpCode = 422;
      message = HTTP_MESSAGE[httpCode];
      errors = err.errors;
      break;
    }

    case err instanceof CustomErrorException ||
      err instanceof BadRequestException ||
      err instanceof ForbiddenException ||
      err instanceof InternalServerErrorException ||
      err instanceof ServiceUnavailableException: {
      httpCode = err.httpCode;
      message = err.message;
      errors = [];
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
    message: message,
    errors: errors,
  });

  next();
}
