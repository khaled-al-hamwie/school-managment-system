import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CredentialsService } from "./credentials.service";
import { Credential } from "./entities/credential.entity";

@Module({
	imports: [SequelizeModule.forFeature([Credential])],
	providers: [CredentialsService],
	exports: [CredentialsService],
})
export class CredentialsModule {}
