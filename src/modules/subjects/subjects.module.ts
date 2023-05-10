import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ClassesModule } from "../classes/classes.module";
import { Subject } from "./entities/subject.entity";
import { SubjectsController } from "./subjects.controller";
import { SubjectsService } from "./subjects.service";

@Module({
    imports: [SequelizeModule.forFeature([Subject]), ClassesModule],
    controllers: [SubjectsController],
    providers: [SubjectsService],
})
export class SubjectsModule { }
