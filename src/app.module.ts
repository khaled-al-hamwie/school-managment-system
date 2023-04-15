import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { databaseProvider } from "./core/database/database.providers";
import { CredentialsModule } from './modules/credentials/credentials.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), databaseProvider, CredentialsModule],
})
export class AppModule {}
