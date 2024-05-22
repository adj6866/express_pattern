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

  @httpGet('example')
  async getById(): Promise<any> {
    return await this.exampleByIdService.getById();
  }

  @httpPost('example', BaseValidation(ExampleCreateDto))
  async create(): Promise<any> {
    return await this.exampleCreateService.create();
  }
}
