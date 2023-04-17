import { createConnection } from "mysql2/promise";

export default async function createDatabase(
	user_name: string,
	password: string,
	name: string
) {
	await createConnection({ user: user_name, password }).then((connection) => {
		connection.query(`CREATE DATABASE IF NOT EXISTS ${name};`);
	});
}
