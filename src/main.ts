import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import { AppModule } from "./app.module";
import { MainValidationPipe } from "./core/common/pipes/MainValidation.pipe";
import swaggerSetup from "./core/swagger/swagger.setup";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
declare const module: any;
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, "..", "uploads"));
    app.useGlobalPipes(MainValidationPipe);
    app.use(compression());
    swaggerSetup(app);
    await app.listen(4000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
