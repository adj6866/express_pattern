import { Container } from 'inversify';
import { DataSource } from "typeorm"
import { dataSource } from '@/config';
import { TYPES } from '@/shared/constants/type.constant';

// inject controllers
import '@/features/welcome.controller';
import '@/features/v4/customer-inquiries/customer-inquiry.controller';

// inject entities
import { CustomerInquiry } from '@/database/entities/customer-inquiry.entity';

export const container = new Container({ autoBindInjectable: true });

// https://typeorm.io/working-with-repository
container.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
container.bind(TYPES.RepositoryCustomerInquiry).toDynamicValue(() => {
  return dataSource.getRepository(CustomerInquiry);
});
