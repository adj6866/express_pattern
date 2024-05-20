import {
  BaseHttpController,
  controller,
  httpPost,
  httpGet
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { BaseValidation } from '../../../validations/base.validation';
import { ExampleValidation } from './create/example-create.validation';
import { ExampleCreateService } from './create/example-create.service';
import { ExampleByIdService } from './getById/example-by-id.service';

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

  @httpGet('/')
  async getById(): Promise<any> {
    return await this.exampleByIdService.getById();
  }

  @httpPost('/', BaseValidation(ExampleValidation))
  async create(): Promise<any> {
    return await this.exampleCreateService.create();
  }
}
