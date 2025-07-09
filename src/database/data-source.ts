// src/database/data-source.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest_app',
//   entities: [UserEntity],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
});
