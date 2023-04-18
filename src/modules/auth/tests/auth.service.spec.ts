import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { AuthService } from "../auth.service";
import ManagerPayload from "../interfaces/manager.payload.interface";

describe("AuthService", () => {
	let service: AuthService;
	let jwt: JwtService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		service = module.get<AuthService>(AuthService);
		jwt = module.get<JwtService>(JwtService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
		expect(jwt).toBeDefined();
	});
	describe("sign toke", () => {
		it("should create with manager payload", async () => {
			let managerPayload: ManagerPayload = {
				credentail_id: 1,
				user_name: "test",
				manager_id: 1,
			};
			let output = await service.signToken(managerPayload);
			expect(output.access_token).not.toBeNull();
			let decoded = await jwt.verify(output.access_token, {
				secret: process.env.JWTKEY,
			});
			expect(
				"credentail_id" in decoded &&
					decoded.credentail_id == managerPayload.credentail_id
			).toBeTruthy();
			expect(
				"manager_id" in decoded &&
					decoded.manager_id == managerPayload.manager_id
			).toBeTruthy();
			expect(
				"user_name" in decoded &&
					decoded.user_name == managerPayload.user_name
			).toBeTruthy();
		});
	});
});
