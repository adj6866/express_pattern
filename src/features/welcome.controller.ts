// import { sbClient } from '@/config/service-bus.config';
// import { ServiceBusMessage } from '@azure/service-bus';
import { BaseValidation } from '@/shared/base';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { WelcomeDto } from './welcome.dto';
import { TYPES } from '@/shared/constants/type.contant';
import { WelcomeTransform } from './welcome.transform';
import { ICarImage } from '@/database/entities/icar-image.entity';


@controller('/')
export class ExampleController extends BaseHttpController {
  private readonly icarImage: Repository<ICarImage>;

  constructor(
    @inject(TYPES.RepositoryICarImage) icarImageRepository: Repository<ICarImage>
  ) {
    super();
    this.icarImage = icarImageRepository;
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
    // example service bus create publisher topic, recommend you create at events/publishers
    // so everybody know how much publisher in a microservices
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
  @httpPost('example-validate', BaseValidation(WelcomeDto))
  async exampleValidate(req: Request) : Promise<any> {
    const body: WelcomeDto = req.body;
    return {
      httpCode: 200,
      data: body
    }
  }

  /**
   * Retrieves ICarImage data based on specific conditions.
  *
  * @return {Promise<any>} An object containing the HTTP status code and the transformed ICarImage data.
  */
  @httpGet('example-transform')
  async exampleTransform(): Promise<any> {
    const findOne =  await this.icarImage.findOne({
      where: {
        ICarImageId: 10751
      }
    });

    const findAll =  await this.icarImage.find({
      where: {
        AuctionItemId: 11312
      }
    });

    return {
      httpCode: 200,
      data: {
        find_one: WelcomeTransform.object(findOne),
        find_all: WelcomeTransform.array(findAll)
      },
    }
  }
}
