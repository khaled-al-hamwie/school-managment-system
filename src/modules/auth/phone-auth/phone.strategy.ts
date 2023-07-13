import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PHONE_TYPE } from "src/core/common/constants/guard.types";
import ManagerPayload from "src/modules/auth/interfaces/manager.payload.interface";
import { ManagersService } from "src/modules/managers/managers.service";
import { StudentsService } from "src/modules/students/students.service";
import { TeachersService } from "src/modules/teachers/teachers.service";
import StudentPayload from "../interfaces/student.payload.interface";
import TeacherPayload from "../interfaces/teacher.payload.interface";

@Injectable()
export default class PhoneStrategy extends PassportStrategy(
    Strategy,
    PHONE_TYPE,
) {
    constructor(
        private readonly studentsService: StudentsService,
        private readonly teachersService: TeachersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWTKEY,
        });
    }

    async validate(payload: StudentPayload | TeacherPayload) {
        if ("student_id" in payload) {
            const student_id = payload.student_id;
            payload;
            const student = await this.studentsService.findOne({
                where: { student_id: payload.student_id },
            });
            if (!student) {
                throw new UnauthorizedException();
            }
            return {
                student_id,
                user_name: payload.user_name,
                credential_id: payload.credentail_id,
            };
        } else if ("teacher_id" in payload) {
            const teacher_id = payload.teacher_id;
            const teacher = await this.teachersService.findOne({
                where: { teacher_id },
            });
            if (!teacher) {
                throw new UnauthorizedException();
            }
            return {
                teacher_id,
                user_name: payload.user_name,
                credential_id: payload.credentail_id,
            };
        } else throw new UnauthorizedException();
    }
    // const id = payload.manager_id;
    // if (!id) {
    //     throw new UnauthorizedException();
    // }
    // const admin = await this.studentsService.findOne({
    //     manager_id: payload.manager_id,
    // });
    // if (!admin) {
    //     throw new UnauthorizedException();
    // }
    // return {
    //     manager_id: payload.manager_id,
    //     user_name: payload.user_name,
    //     credential_id: payload.credentail_id,
    // };
}
