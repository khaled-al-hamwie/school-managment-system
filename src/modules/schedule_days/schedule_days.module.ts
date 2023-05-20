import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LecturesModule } from "../lectures/lectures.module";
import { TeachesModule } from "../teaches/teaches.module";
import { ScheduleDay } from "./entities/schedule_day.entity";
import { ScheduleDaysService } from "./schedule_days.service";

@Module({
    imports: [
        SequelizeModule.forFeature([ScheduleDay]),
        LecturesModule,
        TeachesModule,
    ],
    providers: [ScheduleDaysService],
    exports: [ScheduleDaysService],
})
export class ScheduleDaysModule {}
