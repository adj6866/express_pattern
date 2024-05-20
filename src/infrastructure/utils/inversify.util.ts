import { Container } from 'inversify';
import { DataSource } from "typeorm"
import { TYPES } from '../../domain/constants/types.constant';
import { dataSource } from '../../infrastructure/utils/database.util';
import { NilaiICar } from '../../domain/models/nilai-icar.model';
import '../../presentation/controllers/example.controller';

export const container = new Container({ autoBindInjectable: true });

container.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
container.bind(TYPES.RepositoryNilaiIcar).toDynamicValue(() => {
  return dataSource.getRepository(NilaiICar);
});
