// import { sbClient } from '@/integrations/thrid-party/service-bus.thrid';
// import { ServiceBusMessage } from '@azure/service-bus';
import { ValidationBase } from '@/shared/base/validation.base';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
} from 'inversify-express-utils';
import { WelcomeDto } from './welcome.dto';
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
  @httpGet('/')
  async index() {
    // example service bus create publisher topic
    // const sender = sbClient.createSender('finance-create-payment');

    // const message: ServiceBusMessage = {
    //   body: { content: "foo"},
    //   contentType: 'application/json',
    //   applicationProperties: {
    //     topic_name: 'finance-create-payment',
    //   }
    // }
    // sender.sendMessages(message);

    return {
      httpCode: 200,
      data: null
    }

  }

  /**
   * Validates a request using the WelcomeDto.
  *
  * @param {Request} req - The incoming HTTP request.
  * @return {Promise<any>} A promise containing the HTTP response.
  */
  @httpPost('example-validate', ValidationBase(WelcomeDto))
  async exampleValidate(req: Request) : Promise<any> {
    //
    const body: WelcomeDto = req.body;
    return {
      httpCode: 200,
      data: body
    }
  }
}
