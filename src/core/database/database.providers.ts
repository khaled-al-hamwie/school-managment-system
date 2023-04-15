import { DynamicModule } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { DEVELOPMENT, PRODUCTION, TEST } from '../constants';
import { databaseConfig } from './database.config';

let config: SequelizeModuleOptions;
switch (process.env.NODE_ENV) {
  case DEVELOPMENT:
    config = databaseConfig.development;
    break;
  case TEST:
    config = databaseConfig.test;
    break;
  case PRODUCTION:
    config = databaseConfig.production;
    break;
  default:
    config = databaseConfig.development;
}
export const databaseProvider: DynamicModule = SequelizeModule.forRoot({
  ...config,
  models: [],
  sync: {
    force: true,
  },
});
