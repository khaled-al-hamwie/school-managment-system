import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoomsModule } from "../rooms/rooms.module";
import { ScheduleDaysModule } from "../schedule_days/schedule_days.module";
import { Schedule } from "./entities/schedule.entity";
import { SchedulesController } from "./schedules.controller";
import { SchedulesService } from "./schedules.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Schedule]),
        RoomsModule,
        ScheduleDaysModule,
    ],
    controllers: [SchedulesController],
    providers: [SchedulesService],
})
export class SchedulesModule {}
