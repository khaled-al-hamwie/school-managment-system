import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ScheduleDay } from "./entities/schedule_day.entity";
import { ScheduleDaysController } from "./schedule_days.controller";
import { ScheduleDaysService } from "./schedule_days.service";

@Module({
    imports: [SequelizeModule.forFeature([ScheduleDay])],
    controllers: [ScheduleDaysController],
    providers: [ScheduleDaysService],
})
export class ScheduleDaysModule {}
