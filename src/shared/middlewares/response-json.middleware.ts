import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/shared/constants/http-status.contant';

export function ResponseJson(req: Request, res: Response, next: NextFunction) {
  const originalResponse = res.send.bind(res);

  if (req.originalUrl == '/efe9c963-6e6d-4a3e-9a38-332ce62f4c79') {
    return next();
  }

  res.send = (body: any) => {
    if (
      res.statusCode >= 200
      && res.statusCode < 300
    ) {
      const httpCode = body.httpCode || 200;
      res.set('Content-Type', 'application/json');
      res.status(httpCode);

      const result = {
        transactionId: '0f06b466-99dd-4f59-a5df-1ad9f2a84d0a',
        code: '',
        message: HTTP_STATUS[body.httpCode] || 'OK',
        eTag: 'pfmKgK6RpIkgkAAYukTfo21KRTyCwpiA',
        data: body.data || null
      }

      const page = body.page || null;
      if (page !== null) {
        result['page'] = body.page;
      }

      return originalResponse(JSON.stringify(result));
    }

    return originalResponse(body);
  }

  next();
}
