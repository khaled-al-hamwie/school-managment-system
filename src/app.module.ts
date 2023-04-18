import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { databaseProvider } from "./core/database/database.providers";
import { ManagersModule } from "./modules/managers/managers.module";
import { TeachersModule } from "./modules/teachers/teachers.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.register({ ttl: 60, max: 1000, isGlobal: true }),
		databaseProvider,
		ManagersModule,
		TeachersModule,
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
})
export class AppModule {}
