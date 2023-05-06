import { DynamicModule, Logger } from "@nestjs/common";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { Class } from "src/modules/classes/entities/class.entity";
import { Credential } from "src/modules/credentials/entities/credential.entity";
import { Lecture } from "src/modules/lectures/entities/lecture.entity";
import Manager from "src/modules/managers/entities/manager.entity";
import { Room } from "src/modules/rooms/entities/room.entity";
import Student from "src/modules/students/entities/student.entity";
import { Subject } from "src/modules/subjects/entities/subject.entity";
import Teacher from "src/modules/teachers/entities/teacher.entity";
import { Teach } from "src/modules/teaches/entities/teach.entity";
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
createDatabase(config.username, config.password, config.database);
export const databaseProvider: DynamicModule = SequelizeModule.forRoot({
    ...config,
    // models: [
    //     Credential,
    //     Manager,
    //     Teacher,
    //     Student,
    //     Class,
    //     Room,
    //     Subject,
    //     Teach,
    //     Lecture,
    // ],
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
