import { hash } from "bcryptjs";
import { QueryInterface, Sequelize } from "sequelize";
export = {
	async up(queryInterface: QueryInterface, sequelize: Sequelize) {
		await queryInterface.bulkInsert("Credentials", [
			{
				credential_id: 1,
				email: "testseeder1@test.com",
				user_name: "testseeder1",
				password: await hash("12312121212121212345", 12),
			},
			{
				credential_id: 2,
				email: "testseeder2@test.com",
				user_name: "testseeder2",
				password: await hash("12312121212121212345", 12),
			},
		]);

		await queryInterface.bulkInsert("Managers", [
			{
				manager_id: 1,
				credential_id: 1,
				first_name: "khaled",
				middle_name: "middle",
				last_name: "manager",
				phone_number: "0963351256",
				location: "some where in UK",
				salary: 40.2,
			},
		]);

		await queryInterface.bulkInsert("Teachers", [
			{
				teacher_id: 1,
				credential_id: 2,
				first_name: "khaled",
				middle_name: "middle",
				last_name: "Teacher",
				birth_day: "2000-01-20",
				gender: "m",
				nationality: "UK",
				phone_number: "0963351256",
				location: "some where in UK",
				salary: 20.2,
			},
		]);
	},
	async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
		await queryInterface.bulkDelete("Managers", null, {});
		await queryInterface.bulkDelete("Teachers", null, {});
		await queryInterface.bulkDelete("Credentials", null, {});
	},
};
