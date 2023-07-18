import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Prise } from "./entities/prise.entity";
import { PrizesController } from "./prizes.controller";
import { PrizesService } from "./prizes.service";

@Module({
    imports: [SequelizeModule.forFeature([Prise])],
    controllers: [PrizesController],
    providers: [PrizesService],
    exports: [PrizesService],
})
export class PrizesModule {}
