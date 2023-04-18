import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CredentialsService } from "../credentials.service";
import { CreateCredentialDto } from "../dto/create-credential.dto";
import { Credential } from "../entities/credential.entity";

describe("CredentialsService", () => {
	let service: CredentialsService;
	let createCredentialDto: CreateCredentialDto = {
		email: "testcre@test.come",
		password: "jfd;slak;jfdslka",
		user_name: "testcre",
	};
	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		service = module.get<CredentialsService>(CredentialsService);
		await Credential.destroy({ where: {} });
	});

	beforeEach(() => {
		createCredentialDto = {
			email: "testcre@test.come",
			password: "jfd;slak;jfdslka",
			user_name: "testcre",
		};
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
	describe("create credentail", () => {
		it("should create ", async () => {
			await service.create(createCredentialDto);
			const cre = await Credential.findOne({
				where: {
					user_name: createCredentialDto.user_name,
					email: createCredentialDto.email,
				},
			});
			expect(cre).not.toBeNull();
			expect(cre.password).not.toBe(createCredentialDto.password);
		});
		it("should throw when deplicate email ", async () => {
			createCredentialDto.user_name = "testcre2";
			try {
				await service.create(createCredentialDto);
			} catch (error) {
				expect(error.message).toBe("Conflict Exception");
			}
			const cre = await Credential.findOne({
				where: {
					user_name: createCredentialDto.user_name,
					email: createCredentialDto.email,
				},
			});
			expect(cre).toBeNull();
		});
		it("should throw when deplicate user_name ", async () => {
			createCredentialDto.email = "testcre2@gmail.com";
			try {
				await service.create(createCredentialDto);
			} catch (error) {
				expect(error.message).toBe("Conflict Exception");
			}
			const cre = await Credential.findOne({
				where: {
					user_name: createCredentialDto.user_name,
					email: createCredentialDto.email,
				},
			});
			expect(cre).toBeNull();
		});
	});
});
