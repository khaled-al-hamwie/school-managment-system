import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LecturesModule } from "../lectures/lectures.module";
import { ScheduleDay } from "./entities/schedule_day.entity";
import { ScheduleDaysController } from "./schedule_days.controller";
import { ScheduleDaysService } from "./schedule_days.service";

@Module({
    imports: [SequelizeModule.forFeature([ScheduleDay]), LecturesModule],
    controllers: [ScheduleDaysController],
    providers: [ScheduleDaysService],
    exports: [ScheduleDaysService],
})
export class ScheduleDaysModule {}
