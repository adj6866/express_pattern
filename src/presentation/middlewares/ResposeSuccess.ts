import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../domain/constants/http-status.contant';


export function ResposeSuccess(_req: Request, res: Response, next: NextFunction) {
  const originalResponse = res.send.bind(res);

  res.send = (body: any) => {
    const httpCode = body.httpCode || 200;
    res.status(httpCode);

    const result = {
      transactionId: '0f06b466-99dd-4f59-a5df-1ad9f2a84d0a',
      code: '',
      message: HttpStatus[body.httpCode] || 'OK',
      eTag: 'pfmKgK6RpIkgkAAYukTfo21KRTyCwpiA',
      data: body.data || null
    };

    const page = body.page || null;
    if (page !== null) {
      result['page'] = body.page;
    }

    return originalResponse(JSON.stringify(result));
  };

  next();
}
