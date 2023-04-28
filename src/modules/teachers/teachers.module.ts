import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import TeacherStrategy from "../auth/strategies/teacher.strategy";
import { CredentialsModule } from "../credentials/credentials.module";
import Teacher from "./entities/teacher.entity";
import { TeachersController } from "./teachers.controller";
import { TeachersService } from "./teachers.service";

@Module({
	imports: [
		CredentialsModule,
		SequelizeModule.forFeature([Teacher]),
		AuthModule,
	],
	controllers: [TeachersController],
	providers: [TeachersService, TeacherStrategy],
	exports: [TeachersService],
})
export class TeachersModule {}
