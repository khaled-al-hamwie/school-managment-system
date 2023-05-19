import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Record } from "./entities/record.entity";
import { RecordsController } from "./records.controller";
import { RecordsService } from "./records.service";

@Module({
    imports: [SequelizeModule.forFeature([Record])],
    controllers: [RecordsController],
    providers: [RecordsService],
})
export class RecordsModule {}
