import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StudentsModule } from "../students/students.module";
import { Record } from "./entities/record.entity";
import { RecordsController } from "./records.controller";
import { RecordsService } from "./records.service";

@Module({
    imports: [SequelizeModule.forFeature([Record]), StudentsModule],
    controllers: [RecordsController],
    providers: [RecordsService],
    exports: [RecordsService],
})
export class RecordsModule {}
