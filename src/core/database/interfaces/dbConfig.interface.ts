import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Dialect } from "sequelize";

export interface IDatabaseConfig {
	development: SequelizeModuleOptions;
	test: SequelizeModuleOptions;
	production: SequelizeModuleOptions;
}
