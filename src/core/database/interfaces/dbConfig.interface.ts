import { SequelizeModuleOptions } from "@nestjs/sequelize";

export interface IDatabaseConfig {
    development: SequelizeModuleOptions;
    test: SequelizeModuleOptions;
    production: SequelizeModuleOptions;
}
