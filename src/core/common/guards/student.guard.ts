import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { STUDENT_TYPE } from "../constants/guard.types";

@Injectable()
export default class StudentGuard extends AuthGuard(STUDENT_TYPE) {}
