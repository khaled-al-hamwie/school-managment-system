import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import cleanCredential from "src/core/database/database.cleanCredentail";
import { CreateStudentDto } from "../dto/create-student.dto";
import { StudentsService } from "../students.service";

describe("StudentsService", () => {
	let service: StudentsService;
	let body: CreateStudentDto;
	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		service = module.get<StudentsService>(StudentsService);
		await cleanCredential();
	});

	beforeEach(() => {
		body = {
			first_name: "fdsaf",
			father_name: "fdsafdsa",
			mother_name: "fdsafdsa",
			last_name: "fdasfsadfdsa",
			phone_number: "fdsafdsafads",
			location: "ffasfdsafdsfdsa",
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
});
