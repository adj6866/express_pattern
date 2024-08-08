import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@/constants/http-status.contant';

export function ResponseJson(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const originalSend = res.send.bind(res);

  if (req.originalUrl === '/efe9c963-6e6d-4a3e-9a38-332ce62f4c79') {
    return next();
  }

  res.send = (body: any) => {
    const { httpCode = 200, data = null, page } = body;

    if (httpCode >= 200 && httpCode < 300) {
      res.set('Content-Type', 'application/json');
      res.status(httpCode);

      const responseBody = {
        transactionId: '0f06b466-99dd-4f59-a5df-1ad9f2a84d0a',
        code: '',
        message: HttpStatus[httpCode] || 'OK',
        eTag: 'pfmKgK6RpIkgkAAYukTfo21KRTyCwpiA',
        data,
        ...(page && { page })
      };

      return originalSend(JSON.stringify(responseBody));
    }

    return originalSend(body);
  };

  next();
}
