import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import ManagerPayload from "src/modules/auth/interfaces/manager.payload.interface";
import TeacherPayload from "src/modules/auth/interfaces/teacher.payload.interface";
// type userAttributes = "user_id" | "user_name" | "admin_id";
export const User = createParamDecorator(
	(
		data: keyof TeacherPayload | keyof ManagerPayload,
		ctx: ExecutionContext
	) => {
		const request = ctx.switchToHttp().getRequest();
		const user: TeacherPayload | ManagerPayload = request.user;
		return data ? user?.[data] : user;
	}
);
