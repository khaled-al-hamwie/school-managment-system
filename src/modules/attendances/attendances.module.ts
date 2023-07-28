import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StudentsModule } from "../students/students.module";
import { AttendancesController } from "./attendances.controller";
import { AttendancesService } from "./attendances.service";
import { Attendance } from "./entities/attendance.entity";

@Module({
    imports: [SequelizeModule.forFeature([Attendance]), StudentsModule],
    controllers: [AttendancesController],
    providers: [AttendancesService],
})
export class AttendancesModule {}
