import {
  BaseHttpController,
  controller,
  httpGet,
  request,
  requestParam,
  httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { BaseValidation } from '@/shared/base';
import { ByIdService } from './query/by-id/by-id.service';
import { CreateDto } from './command/create/create.dto';
import { GetALlService } from './query/get-all/get-all.service';
import { CreateService } from './command/create/create.service';

@controller('/v1/users')
export class UserController extends BaseHttpController {
  constructor(
    @inject(GetALlService) private readonly getALlService: GetALlService,
    @inject(ByIdService) private readonly byIdService: ByIdService,
    @inject(CreateService) private readonly createService: CreateService
  ) {
    super();
    this.getALlService = getALlService;
    this.byIdService = byIdService;
    this.createService = createService;
  }

  @httpGet('/')
  async getAll(@request() req: any) {
    return await this.getALlService.getAll(req);
  }

  @httpPost('/', BaseValidation(CreateDto))
  async create(@request() req: any) {
    return await this.createService.create(req);
  }

  @httpGet('/:id')
  async byId(@requestParam('id') id: any) {
    return await this.byIdService.byId(id);
  }
}
