import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Credential } from "src/modules/credentials/entities/credential.entity";
import { CreateManagerDto } from "../dto/create-manager.dto";
import Manager from "../entities/manager.entity";
import { ManagersService } from "../managers.service";

describe("ManagersService", () => {
	let service: ManagersService;
	let body: CreateManagerDto = {
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

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		service = module.get<ManagersService>(ManagersService);
		await Manager.destroy({ where: {} });
		await Credential.destroy({ where: {} });
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
	it("should create", async () => {
		const manager = await service.create(body);
		expect(manager).not.toBeNull();
		expect(
			await Manager.findOne({ where: { manager_id: manager.manager_id } })
		).not.toBeNull();

		expect(manager.first_name).toBe(body.first_name);
		expect(manager.middle_name).toBe(body.middle_name);
		expect(manager.location).toBe(body.location);
		expect(manager.salary).toBe(body.salary);
		expect(manager.phone_number).toBe(body.phone_number);
		expect(manager.last_name).toBe(body.last_name);
	});
});
