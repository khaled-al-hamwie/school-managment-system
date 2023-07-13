import { Module } from "@nestjs/common";
import { PhoneGuard } from "src/core/common/guards/phone.guard";
import { StudentsModule } from "src/modules/students/students.module";
import { TeachersModule } from "src/modules/teachers/teachers.module";
import PhoneStrategy from "./phone.strategy";

@Module({
    imports: [StudentsModule, TeachersModule],
    providers: [PhoneStrategy],
})
export class PhoneAuthModule {}
