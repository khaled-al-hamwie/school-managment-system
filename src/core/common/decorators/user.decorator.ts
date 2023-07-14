import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import ManagerPayload from "src/modules/auth/interfaces/manager.payload.interface";
import StudentPayload from "src/modules/auth/interfaces/student.payload.interface";
import TeacherPayload from "src/modules/auth/interfaces/teacher.payload.interface";
export const User = createParamDecorator(
    (
        data:
            | keyof TeacherPayload
            | keyof ManagerPayload
            | keyof StudentPayload,
        ctx: ExecutionContext,
    ) => {
        const request = ctx.switchToHttp().getRequest();
        const user: TeacherPayload | ManagerPayload = request.user;
        return data ? user?.[data] : user;
    },
);
