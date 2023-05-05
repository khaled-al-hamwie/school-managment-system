import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { STUDENT_TYPE } from "src/core/constants/guard.types";
import { StudentsService } from "src/modules/students/students.service";
import StudentPayload from "../interfaces/student.payload.interface";

@Injectable()
export default class StudentStrategy extends PassportStrategy(
    Strategy,
    STUDENT_TYPE
) {
    constructor(private readonly studentsService: StudentsService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWTKEY,
        });
    }

    async validate(payload: StudentPayload) {
        const id = payload.student_id;
        if (!id) {
            throw new UnauthorizedException();
        }
        const student = await this.studentsService.findOne({
            student_id: payload.student_id,
        });
        if (!student) {
            throw new UnauthorizedException();
        }
        return {
            student_id: payload.student_id,
            user_name: payload.user_name,
            credential_id: payload.credentail_id,
        };
    }
}
