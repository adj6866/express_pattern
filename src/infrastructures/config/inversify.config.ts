import { Container } from 'inversify';
import { DataSource } from "typeorm"
import { TYPES } from '@/shared/constants/type.contant';
import { dataSource } from '@/infrastructures/config/database.config';

// inject controllers
import '@/features/welcome.controller';

// inject entities
import { ICarImage } from '@/infrastructures/database/entities/icar-image.entity';

export const container = new Container({ autoBindInjectable: true });

// https://typeorm.io/working-with-repository
container.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
container.bind(TYPES.RepositoryICarImage).toDynamicValue(() => {
  return dataSource.getRepository(ICarImage);
});
