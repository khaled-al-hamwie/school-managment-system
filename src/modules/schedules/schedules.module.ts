import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ScheduleDaysModule } from "../schedule_days/schedule_days.module";
import { StudentsModule } from "../students/students.module";
import { Schedule } from "./entities/schedule.entity";
import { SchedulesController } from "./schedules.controller";
import { SchedulesService } from "./schedules.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Schedule]),
        ScheduleDaysModule,
        StudentsModule,
    ],
    controllers: [SchedulesController],
    providers: [SchedulesService],
    exports: [SchedulesService],
})
export class SchedulesModule {}
