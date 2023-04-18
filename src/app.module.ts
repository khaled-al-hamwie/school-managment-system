import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { databaseProvider } from "./core/database/database.providers";
import { ManagersModule } from "./modules/managers/managers.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		databaseProvider,
		ManagersModule,
	],
})
export class AppModule {}
