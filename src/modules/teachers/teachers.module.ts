import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import ManagerStrategy from "../auth/strategies/manager.strategy";
import TeacherStrategy from "../auth/strategies/teacher.strategy";
import { CredentialsModule } from "../credentials/credentials.module";
import { ManagersModule } from "../managers/managers.module";
import Teacher from "./entities/teacher.entity";
import { TeachersController } from "./teachers.controller";
import { TeachersService } from "./teachers.service";

@Module({
	imports: [
		CredentialsModule,
		SequelizeModule.forFeature([Teacher]),
		AuthModule,
		ManagersModule,
	],
	controllers: [TeachersController],
	providers: [TeachersService, ManagerStrategy, TeacherStrategy],
	exports: [TeachersService],
})
export class TeachersModule {}
