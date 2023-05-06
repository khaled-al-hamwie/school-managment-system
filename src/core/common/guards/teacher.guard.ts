import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TEACHER_TYPE } from "../constants/guard.types";

@Injectable()
export default class TeacherGuard extends AuthGuard(TEACHER_TYPE) {}
