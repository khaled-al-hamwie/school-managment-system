import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as compression from "compression";
import { join } from "path";
import { AppModule } from "./app.module";
import { MainValidationPipe } from "./core/common/pipes/MainValidation.pipe";
import swaggerSetup from "./core/swagger/swagger.setup";
declare const module: any;
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, "..", "uploads"));
    app.useGlobalPipes(MainValidationPipe);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.use(compression());
    swaggerSetup(app);
    await app.listen(process.env.PORT || 4000, "0.0.0.0");
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
