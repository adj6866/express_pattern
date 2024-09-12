import { pubSubConfig } from '@/config/pubsub.config';
import { emailConfig, renderBody } from '@/config/email.config';
import {
  BaseHttpController,
  controller,
  httpGet,
} from 'inversify-express-utils';
import * as path from 'path';


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
  @httpGet('/')
  async index() {
    const pubSub = pubSubConfig();
    pubSub.publish('finance-create-payment', { content: "foo" });

    const email = emailConfig();
    await email.send(
      { to: 'ahmaddjunaedi92@gmail.com' },
      await renderBody(path.resolve(__dirname, '../shared/resources/emails/forgot-password.ejs'), {
        url_reset_password: 'https://example.com/reset-password',
        url_contact_us: 'https://example.com/contact-us'
      })
    );

    return {
      httpCode: 200,
      data: null
    }

  }
}