import { Container } from 'inversify';
import { DataSource } from 'typeorm';
import { dataSource } from '@/utils';
import { TYPES } from '@/shared/constants/type.constant';

// inject entities
import { User } from '@/database/entities';

// inject controllers
import '@/features';

const container = new Container({ autoBindInjectable: true });

// https://typeorm.io/working-with-repository
container.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);

// bind repositories
const repositories = [{ type: TYPES.RepositoryUser, entity: User }];
repositories.forEach(({ type, entity }) => {
  container.bind(type).toDynamicValue(() => {
    return dataSource.getRepository(entity);
  });
});

export { container };
