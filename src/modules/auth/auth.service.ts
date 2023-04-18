import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JwtAttributes } from "./interfaces/jwt.interface";
import ManagerPayload from "./interfaces/manager.payload.interface";

@Injectable()
export class AuthService {
	constructor(
		private configService: ConfigService,
		private jwtService: JwtService
	) {}
	signToken(payload: ManagerPayload): JwtAttributes {
		const option = {
			secret: this.configService.get("JWTKEY"),
			expiresIn: this.configService.get("TOKEN_EXPIRATION"),
		};
		return {
			access_token: this.jwtService.sign(payload, option),
		};
	}
}
