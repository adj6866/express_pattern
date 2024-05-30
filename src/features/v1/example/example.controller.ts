import {
  BaseHttpController,
  controller,
  httpPost,
  httpGet
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { BaseValidation } from '@/validations/base.validation';
import { ExampleCreateDto } from './create/example-create.dto';
import { ExampleCreateService } from './create/example-create.service';
import { ExampleByIdService } from './get-by-id/example-by-id.service';
import { SbUtil } from "@/utils/service-bus.util";
import {
  ServiceBusMessage
} from "@azure/service-bus";


const topicName = 'doku-create-va';
@controller('/')
export class ExampleController extends BaseHttpController {
  private readonly exampleCreateService: ExampleCreateService;
  private readonly exampleByIdService: ExampleByIdService;

  constructor(
    @inject(ExampleCreateService) exampleCreateService: ExampleCreateService,
    @inject(ExampleByIdService) exampleByIdService: ExampleByIdService
  ) {
    super();
    this.exampleCreateService = exampleCreateService;
    this.exampleByIdService = exampleByIdService;
  }

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
    const sender = SbUtil.createSender(topicName);

    // Define the message to be sent
    const message: ServiceBusMessage = {
      body: { content: "This is a test message" },
      contentType: "application/json",
      applicationProperties: {
        publish: "doku-create-va"
      }
    };
    sender.sendMessages(message);

    return {
      httpCode: 200,
      data: null
    }

  }

  @httpGet('example')
  async getById(): Promise<any> {
    return await this.exampleByIdService.getById();
  }

  @httpPost('example', BaseValidation(ExampleCreateDto))
  async create(): Promise<any> {
    return await this.exampleCreateService.create();
  }
}
