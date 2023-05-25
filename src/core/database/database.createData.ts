import { Logger } from "@nestjs/common";
import { createConnection } from "mysql2/promise";

export default async function createDatabase(
    user_name: string,
    password: string,
    name: string,
    host: string
) {
    await createConnection({ user: user_name, password, host }).then(
        (connection) => {
            new Logger("SequelizeQuery").verbose(
                `CREATE DATABASE IF NOT EXISTS ${name};`
            );
            connection.query(`CREATE DATABASE IF NOT EXISTS ${name};`);
        }
    );
}
