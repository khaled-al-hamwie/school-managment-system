import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { databaseProvider } from "./core/database/database.providers";
import { CredentialsModule } from './modules/credentials/credentials.module';
import { AuthModule } from './modules/auth/auth.module';
import { ManagersModule } from './modules/managers/managers.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), databaseProvider, CredentialsModule, AuthModule, ManagersModule],
})
export class AppModule {}
