import { Repository } from 'typeorm';
import { NilaiICar } from '@/entities/nilai-icar.entity';
import { injectable, inject } from 'inversify';
import { TYPES } from '@/constants/types.constant';
import { ExampleCreateTransform } from './example-create.transform';

@injectable()
export class ExampleCreateService {
  private readonly nilaiIcarRepository: Repository<NilaiICar>;

  constructor(
    @inject(TYPES.RepositoryNilaiIcar) nilaiIcarRepository: Repository<NilaiICar>
  ) {
    this.nilaiIcarRepository = nilaiIcarRepository;
  }

  async create(): Promise<any> {
    const nilaiIcar =  await this.nilaiIcarRepository.findOneBy({
      AuctionItemId: 11312,
    });

    return {
      httpCode: 201,
      data: ExampleCreateTransform.transform(nilaiIcar),
      page: {
        skip: 1,
        limit: 10
      }
    };
  }
}
