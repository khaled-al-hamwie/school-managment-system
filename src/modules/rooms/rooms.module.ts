import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ClassesModule } from "../classes/classes.module";
import { GroupsModule } from "../groups/groups.module";
import { RecordsModule } from "../records/records.module";
import { SchedulesModule } from "../schedules/schedules.module";
import { StudentsModule } from "../students/students.module";
import { Room } from "./entities/room.entity";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Room]),
        ClassesModule,
        SchedulesModule,
        RecordsModule,
        StudentsModule,
        GroupsModule,
    ],
    controllers: [RoomsController],
    providers: [RoomsService],
    exports: [RoomsService],
})
export class RoomsModule {}
