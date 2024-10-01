// import { default as pubSub } from '@/config/pubsub.config';
import { default as email, renderBody } from '@/utils/email.util';
import {
  BaseHttpController,
  controller,
  httpPost,
} from 'inversify-express-utils';
import * as path from 'path';
import { Request } from 'express';


@controller('/')
export class ExampleController extends BaseHttpController {

  /**
   * @swagger
   * /:
   *   get:
   *     description: Welcome controller
   *     responses:
   *       200:
   *         description: OK
   */
  @httpPost('/')
  async index(req: Request) {
    // pubSub.publish('finance-create-payment', { content: "foo" });

    await email.send(
      {
        to: 'ahmaddjunaedi92@gmail.com',
        subject: 'Astra Car Valuation - Pelunasan Pembayaran Inspeksi',
      },
      await renderBody(
        path.resolve(
          __dirname,
          '../shared/resources/emails/payment-method-virtual-account.ejs'
        ),
        {
          data: req.body,
        }
      )
    );

    return {
      httpCode: 200,
      data: null
    }
  }
}
