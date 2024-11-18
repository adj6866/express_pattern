import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_MESSAGE } from '@/shared/constants/http-status.constant';
import crypto from 'crypto-js';

export function VerifyJWT(req: Request, res: Response, next: NextFunction) {
  const exceptionRoutes = [
    '/',
    '/api-docs/0192989a-6a52-7bb7-b259-5c1a102c1a70', // Swagger Docs
    '/v1/login',
    '/v1/login/provider',
    '/v1/register',
    '/v1/forgot-password',
    '/v1/refresh-token',
  ];

  const dynamicRoutes = [
    /^\/v1\/register\/activation\/[^/]+$/, // '/v1/register/activation/:token'
  ];

  // Jika route termasuk dalam pengecualian, lanjut ke handler berikutnya
  if (
    exceptionRoutes.includes(req.originalUrl) ||
    dynamicRoutes.some((regex) => regex.test(req.originalUrl))
  ) {
    return next();
  }

  const token = req.headers['authorization']?.split(' ')[1]; // Format: Bearer <token>

  if (!token) {
    return res.status(401).json({
      transactionId: '0f06b466-99dd-4f59-a5df-1ad9f2a84d0a',
      code: '',
      message: HTTP_MESSAGE[401] || 'Unauthorized',
      eTag: 'pfmKgK6RpIkgkAAYukTfo21KRTyCwpiA',
      errros: [],
    });
  }

  // Verifikasi JWT
  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({
        transactionId: '0f06b466-99dd-4f59-a5df-1ad9f2a84d0a',
        code: '',
        message: HTTP_MESSAGE[403] || 'Forbidden',
        eTag: 'pfmKgK6RpIkgkAAYukTfo21KRTyCwpiA',
        errros: [],
      });
    }

    req.user = {
      tokenUserId: decoded.sub,
      tokenRole: crypto.AES.decrypt(
        decoded.role,
        process.env.ENCRYPTION_KEY
      ).toString(crypto.enc.Utf8),
      tokenEmail: crypto.AES.decrypt(
        decoded.email,
        process.env.ENCRYPTION_KEY
      ).toString(crypto.enc.Utf8),
      tokenRoles: JSON.parse(
        crypto.AES.decrypt(decoded.roles, process.env.ENCRYPTION_KEY).toString(
          crypto.enc.Utf8
        )
      ),
    };

    next();
  });
}
