import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import StudentStrategy from "../auth/strategies/student.strategy";
import { CredentialsModule } from "../credentials/credentials.module";
import Student from "./entities/student.entity";
import { StudentsBusesService } from "./services/students.buses.service";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";

@Module({
    imports: [
        CredentialsModule,
        SequelizeModule.forFeature([Student]),
        AuthModule,
    ],
    controllers: [StudentsController],
    providers: [StudentsService, StudentStrategy, StudentsBusesService],
    exports: [StudentsService, StudentsBusesService],
})
export class StudentsModule { }
