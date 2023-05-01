import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export default function swaggerSetup(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle("school managment system")
        .setDescription("this is the school managment system api explain")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
}
