import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Grade } from "./entities/grade.entity";
import { GradesController } from "./grades.controller";
import { GradesService } from "./grades.service";

@Module({
    imports: [SequelizeModule.forFeature([Grade])],
    controllers: [GradesController],
    providers: [GradesService],
})
export class GradesModule {}
