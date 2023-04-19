import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TEACHER_TYPE } from "src/core/constants/guard.types";
import { TeachersService } from "src/modules/teachers/teachers.service";
import TeacherPayload from "../interfaces/teacher.payload.interface";

@Injectable()
export default class TeacherStrategy extends PassportStrategy(
	Strategy,
	TEACHER_TYPE
) {
	constructor(private readonly teachersService: TeachersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWTKEY,
		});
	}

	async validate(payload: TeacherPayload) {
		const id = payload.teacher_id;
		if (!id) {
			throw new UnauthorizedException();
		}
		const teacher = await this.teachersService.findOne({
			teacher_id: payload.teacher_id,
		});
		if (!teacher) {
			throw new UnauthorizedException();
		}
		return {
			teacher_id: payload.teacher_id,
			user_name: payload.user_name,
			credential_id: payload.credentail_id,
		};
	}
}
