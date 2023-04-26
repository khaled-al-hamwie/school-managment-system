import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import ManagerStrategy from "../auth/strategies/manager.strategy";
import { CredentialsModule } from "../credentials/credentials.module";
import Student from "./entities/student.entity";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";

@Module({
	imports: [
		CredentialsModule,
		SequelizeModule.forFeature([Student]),
		AuthModule,
	],
	controllers: [StudentsController],
	providers: [StudentsService],
})
export class StudentsModule {}
