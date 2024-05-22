import { Container } from 'inversify';
import { DataSource } from "typeorm"
import { TYPES } from '@/constants/types.constant';
import { dataSource } from '@/utils/database.util';

// inject controllers
import '@/features/v1/example/example.controller';

// inject entities
import { NilaiICar } from '@/entities/nilai-icar.entity';
import { ICarImage } from '@/entities/icar-image.entity';

export const container = new Container({ autoBindInjectable: true });

// https://typeorm.io/working-with-repository
container.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
container.bind(TYPES.RepositoryNilaiIcar).toDynamicValue(() => {
  return dataSource.getRepository(NilaiICar);
});
container.bind(TYPES.RepositoryICarImage).toDynamicValue(() => {
  return dataSource.getRepository(ICarImage);
});
