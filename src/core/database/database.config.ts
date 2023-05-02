import * as dotenv from "dotenv";
import { IDatabaseConfig } from "./interfaces/dbConfig.interface";

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_DEVELOPMENT,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "mysql",
        autoLoadModels: true,
        define: {
            timestamps: false,
        },
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_TEST,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "mysql",
        autoLoadModels: true,
        logging: undefined,
        define: {
            timestamps: false,
        },
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_PRODUCTION,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "mysql",
        autoLoadModels: true,
        logging: false,
        define: {
            timestamps: false,
        },
    },
};
