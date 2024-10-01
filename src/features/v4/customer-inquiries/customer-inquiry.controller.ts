import {
  BaseHttpController,
  controller,
  httpGet,
  request,
  requestParam
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { ListService } from './query/list/list.service';
import { ByIdService } from './query/by-id/by-id.service';

@controller('/v4/customer-inquiries')
export class CustomerInquiryController extends BaseHttpController {
  private readonly listService: ListService;
  private readonly byIdService: ByIdService;

  constructor(
    @inject(ListService) listService: ListService,
    @inject(ByIdService) byIdService: ByIdService
  ) {
    super();
    this.listService = listService;
    this.byIdService = byIdService;
  }

  @httpGet('/')
  async index(@request() req: any) {
    return await this.listService.list(req);
  }

  @httpGet('/:id')
  async byId(@requestParam('id') id: number) {
    return await this.byIdService.byId(id);
  }
}
