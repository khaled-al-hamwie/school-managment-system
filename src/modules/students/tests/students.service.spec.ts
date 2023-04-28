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
			gender: "f",
		};
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create", async () => {
		const output = await service.create(body);
		expect(output).toBe("done");
	});
	it("should find", async () => {
		const output = await service.findOne({ father_name: "fdsafdsa" });
		expect(output).not.toBeNull();
	});
	it("should update", async () => {
		body["first_name"] = "khaled al ha";
		const output = await service.update(
			(
				await service.findOne({ father_name: "fdsafdsa" })
			).student_id,
			body
		);
		expect(output).toBe("done");
	});
	it("should login ", async () => {
		const output = await service.login({
			user_name: body.user_name,
			password: body.password,
		});
		expect(output.access_token).not.toBeNull();
	});
});
