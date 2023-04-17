import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			stopAtFirstError: true,
			whitelist: true,
			errorHttpStatusCode: HttpStatus.FORBIDDEN,
		})
	);
	await app.listen(4000);
}
bootstrap();
