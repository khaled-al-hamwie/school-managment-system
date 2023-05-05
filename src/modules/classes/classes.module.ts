import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ClassesController } from "./classes.controller";
import { ClassesService } from "./classes.service";
import { Class } from "./entities/class.entity";

@Module({
    imports: [SequelizeModule.forFeature([Class])],
    controllers: [ClassesController],
    providers: [ClassesService],
})
export class ClassesModule {}
