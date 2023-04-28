import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MainValidationPipe } from "./core/pipes/MainValidation.pipe";
import swaggerSetup from "./core/swagger/swagger.setup";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(MainValidationPipe);
	swaggerSetup(app);
	await app.listen(4000);
}
bootstrap();
