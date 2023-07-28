import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AttendancesController } from "./attendances.controller";
import { AttendancesService } from "./attendances.service";
import { Attendance } from "./entities/attendance.entity";

@Module({
    imports: [SequelizeModule.forFeature([Attendance])],
    controllers: [AttendancesController],
    providers: [AttendancesService],
})
export class AttendancesModule {}
