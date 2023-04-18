import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import Manager from "src/modules/managers/entities/manager.entity";
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
		await Manager.destroy({ where: {} });
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
			const output = await service.create(createCredentialDto);
			const cre = await Credential.findOne({
				where: {
					user_name: createCredentialDto.user_name,
					email: createCredentialDto.email,
				},
			});
			expect(cre).not.toBeNull();
			expect(cre.password).not.toBe(createCredentialDto.password);
			expect(output).not.toBeNull();
			expect("credential_id" in output).toBeTruthy();
			expect("email" in output).toBeTruthy();
			expect("password" in output).toBeTruthy();
			expect("user_name" in output).toBeTruthy();
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
	describe("verify credentail", () => {
		it("should be verify", async () => {
			const output = await service.verify({
				user_name: createCredentialDto.user_name,
				password: createCredentialDto.password,
			});
			expect(output).not.toBeNull();
			expect("credential_id" in output).toBeTruthy();
			expect("email" in output).toBeTruthy();
			expect("password" in output).toBeTruthy();
			expect("user_name" in output).toBeTruthy();
		});
		it("should not verify wrong user_name", async () => {
			createCredentialDto["user_name"] = "testcre3";
			try {
				const output = await service.verify({
					user_name: createCredentialDto.user_name,
					password: createCredentialDto.password,
				});
			} catch (error) {
				expect(error.message).toBe("credentials don't match");
			}
		});
		it("should be verify", async () => {
			createCredentialDto["password"] = "testcre3";
			try {
				const output = await service.verify({
					user_name: createCredentialDto.user_name,
					password: createCredentialDto.password,
				});
			} catch (error) {
				expect(error.message).toBe("credentials don't match");
			}
		});
	});
	describe("remove credentail", () => {
		it("should be removed", async () => {
			createCredentialDto["email"] = "testcre2@gmail.com";
			createCredentialDto["user_name"] = "testcre2";
			const credentail = await service.create(createCredentialDto);
			await service.remove(credentail.credential_id);
			expect(
				await Credential.findByPk(credentail.credential_id)
			).toBeNull();
		});
	});
});
