import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RecordsModule } from "../records/records.module";
import { Grade } from "./entities/grade.entity";
import { GradesController } from "./grades.controller";
import { GradesService } from "./grades.service";

@Module({
    imports: [SequelizeModule.forFeature([Grade]), RecordsModule],
    controllers: [GradesController],
    providers: [GradesService],
    exports: [GradesService],
})
export class GradesModule {}
