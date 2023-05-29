import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StudentsModule } from "../students/students.module";
import { BusesSubscribtionsController } from "./buses-subscribtions/buses-subscribtions.controller";
import { BusesController } from "./buses.controller";
import { BusesService } from "./buses.service";
import { Bus } from "./entities/bus.entity";

@Module({
    imports: [SequelizeModule.forFeature([Bus]), StudentsModule],
    controllers: [BusesController, BusesSubscribtionsController],
    providers: [BusesService],
})
export class BusesModule {}
