import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import ManagerStrategy from "../auth/strategies/manager.strategy";
import { CredentialsModule } from "../credentials/credentials.module";
import Manager from "./entities/manager.entity";
import { ManagersController } from "./managers.controller";
import { ManagersService } from "./managers.service";

@Module({
    imports: [
        CredentialsModule,
        SequelizeModule.forFeature([Manager]),
        AuthModule,
    ],
    controllers: [ManagersController],
    providers: [ManagersService, ManagerStrategy],
    exports: [ManagersService],
})
export class ManagersModule {}
