import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import ManagerPayload from "src/modules/auth/interfaces/manager.payload.interface";
import { ManagersService } from "src/modules/managers/managers.service";

@Injectable()
export default class ManagerStrategy extends PassportStrategy(
	Strategy,
	"manager"
) {
	constructor(private readonly managersService: ManagersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWTKEY,
		});
	}

	async validate(payload: ManagerPayload) {
		const id = payload.manager_id;
		if (!id) {
			throw new UnauthorizedException();
		}
		const admin = await this.managersService.findOne(payload.manager_id);
		if (!admin) {
			throw new UnauthorizedException();
		}
		return {
			manager_id: payload.manager_id,
			user_name: payload.user_name,
			credential_id: payload.credentail_id,
		};
	}
}
