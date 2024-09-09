import { Container } from 'inversify';
import { DataSource } from "typeorm"
import { dataSource } from '@/config';
import { TYPES } from '@/shared/constants/type.contant';

// inject controllers
import '@/features/welcome.controller';

// inject entities
import { ICarImage } from '@/database/entities/icar-image.entity';

export const container = new Container({ autoBindInjectable: true });

// https://typeorm.io/working-with-repository
container.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
container.bind(TYPES.RepositoryICarImage).toDynamicValue(() => {
  return dataSource.getRepository(ICarImage);
});
