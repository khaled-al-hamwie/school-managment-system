import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Credential } from "src/modules/credentials/entities/credential.entity";
import Manager from "src/modules/managers/entities/manager.entity";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import Teacher from "../entities/teacher.entity";
import { TeachersService } from "../teachers.service";

describe("TeachersService", () => {
	let service: TeachersService;
	let body: CreateTeacherDto;
	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		service = module.get<TeachersService>(TeachersService);
		await Manager.destroy({ where: {} });
		await Teacher.destroy({ where: {} });
		await Credential.destroy({ where: {} });
	});

	beforeEach(() => {
		body = {
			first_name: "fdsaf",
			middle_name: "fdsafdsa",
			last_name: "fdasfsadfdsa",
			phone_number: "fdsafdsafads",
			location: "ffasfdsafdsfdsa",
			salary: 100,
			email: "testma@test.com",
			password: "fdsfsadafsdfsad",
			user_name: "testma",
			birth_day: new Date(),
			gender: "F",
		};
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
	it("should create", async () => {
		const output = await service.create(body);
		expect(output).toBe("done");
	});
	it("should not allow deplicate phone number", async () => {
		body["email"] = "testma2@test.com";
		body["password"] = "fdsfsadafsdfsad2";
		try {
			await service.create(body);
		} catch (error) {
			expect(error.message).toBe("Conflict Exception");
		}
	});
	it("should login ", async () => {
		const output = await service.login({
			user_name: body.user_name,
			password: body.password,
		});
		expect(output.access_token).not.toBeNull();
	});
});
