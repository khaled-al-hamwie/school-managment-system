import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import { AppModule } from "./app.module";
import { MainValidationPipe } from "./core/pipes/MainValidation.pipe";
import swaggerSetup from "./core/swagger/swagger.setup";
declare const module: any;
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
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
