import { sbClient } from '@/integrations/thrid-party/service-bus.thrid';
import { ServiceBusMessage } from '@azure/service-bus';
import {
  BaseHttpController,
  controller,
  httpGet
} from 'inversify-express-utils';

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
    const sender = sbClient.createSender('finance-create-payment');

    const message: ServiceBusMessage = {
      body: { content: "foo"},
      contentType: 'application/json',
      applicationProperties: {
        topic_name: 'finance-create-payment',
      }
    }
    sender.sendMessages(message);

    return {
      httpCode: 200,
      data: null
    }

  }
}
