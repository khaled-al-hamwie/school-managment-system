import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CredentialsController } from "./credentials.controller";
import { CredentialsService } from "./credentials.service";
import { Credential } from "./entities/credential.entity";

@Module({
	imports: [SequelizeModule.forFeature([Credential])],
	controllers: [CredentialsController],
	providers: [CredentialsService],
	exports: [CredentialsService],
})
export class CredentialsModule {}
