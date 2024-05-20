import { DataSource } from "typeorm"
import { join } from 'path';

export const dataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '../entities/*.entity{.ts,.js}')],
  synchronize: false,
});
