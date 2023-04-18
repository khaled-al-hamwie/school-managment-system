import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Credential } from "src/modules/credentials/entities/credential.entity";
import { CreateManagerDto } from "../dto/create-manager.dto";
import Manager from "../entities/manager.entity";
import { ManagersService } from "../managers.service";

describe("ManagersService", () => {
	let service: ManagersService;
	let body: CreateManagerDto;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		service = module.get<ManagersService>(ManagersService);
		await Manager.destroy({ where: {} });
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
