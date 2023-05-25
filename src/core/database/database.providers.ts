import { DynamicModule, Logger } from "@nestjs/common";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { DEVELOPMENT, PRODUCTION, TEST } from "../common/constants";
import { databaseConfig } from "./database.config";
import createDatabase from "./database.createData";

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
createDatabase(config.username, config.password, config.database, config.host);
export const databaseProvider: DynamicModule = SequelizeModule.forRoot({
    ...config,
    autoLoadModels: true,
    synchronize: true,
    logging: (Entity) =>
        new Logger("SequelizeQuery").verbose(
            "\n" + Entity.split("Executing (default): ")[1]
        ),
    // sync: {
    // force: true,
    // },
});
