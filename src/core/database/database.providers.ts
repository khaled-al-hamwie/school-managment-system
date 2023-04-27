import { DynamicModule } from "@nestjs/common";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { Credential } from "src/modules/credentials/entities/credential.entity";
import Manager from "src/modules/managers/entities/manager.entity";
import Teacher from "src/modules/teachers/entities/teacher.entity";
import { DEVELOPMENT, PRODUCTION, TEST } from "../constants";
import { databaseConfig } from "./database.config";
import createDatabase from "./database.createData";
import { Class } from "src/modules/classes/entities/class.entity";
import { Room } from "src/modules/rooms/entities/room.entity";
import { Subject } from "src/modules/subjects/entities/subject.entity";
import { Teach } from "src/modules/teaches/entities/teach.entity";
import { Lecture } from "src/modules/lectures/entities/lecture.entity";

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
createDatabase(config.username, config.password, config.database);
export const databaseProvider: DynamicModule = SequelizeModule.forRoot({
	...config,
	models: [Credential, Manager, Teacher, Class, Room, Subject, Teach, Lecture],
	//  sync: {
	// 	force: true,
	// },
});
