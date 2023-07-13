import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PHONE_TYPE } from "../constants/guard.types";

@Injectable()
export class PhoneGuard extends AuthGuard(PHONE_TYPE) {}
