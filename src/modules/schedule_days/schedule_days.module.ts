import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LecturesModule } from "../lectures/lectures.module";
import { ScheduleDay } from "./entities/schedule_day.entity";
import { ScheduleDaysService } from "./schedule_days.service";

@Module({
    imports: [SequelizeModule.forFeature([ScheduleDay]), LecturesModule],
    providers: [ScheduleDaysService],
    exports: [ScheduleDaysService],
})
export class ScheduleDaysModule {}
