import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ClassesModule } from "../classes/classes.module";
import { SchedulesModule } from "../schedules/schedules.module";
import { Room } from "./entities/room.entity";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Room]),
        ClassesModule,
        SchedulesModule,
    ],
    controllers: [RoomsController],
    providers: [RoomsService],
    exports: [RoomsService],
})
export class RoomsModule {}
