import {
  BaseHttpController,
  controller,
  httpPost
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Repository } from 'typeorm';
import { TYPES } from '../../domain/constants/types.constant';
import { NilaiICar } from '../../domain/models/nilai-icar.model';
import { BaseValidation } from '../validations/base.validation';
import { ExampleValidation } from '../validations/example.validation';
// import { CustomError } from '../../domain/exceptions/custom-error.exception';

@controller('/')
export class ExampleController extends BaseHttpController {
  private readonly nilaiIcarRepository: Repository<NilaiICar>;

  constructor(
    @inject(TYPES.RepositoryNilaiIcar) nilaiIcarRepository: Repository<NilaiICar>
  ) {
    super();
    this.nilaiIcarRepository = nilaiIcarRepository;
  }

  @httpPost('/', BaseValidation(ExampleValidation))
  async index() : Promise<any> {
    // throw new CustomError('EXAMPLE ERROR', 404);
    console.log(ExampleValidation);
    const nilaiIcar =  await this.nilaiIcarRepository.findOneBy({
      AuctionItemId: 11312,
    });

    return {
      httpCode: 201,
      data: nilaiIcar,
      page: {
        skip: 1,
        limit: 10
      }
    };
  }
}
