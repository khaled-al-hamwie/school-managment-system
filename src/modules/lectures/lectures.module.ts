import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TeachesModule } from "../teaches/teaches.module";
import { Lecture } from "./entities/lecture.entity";
import { LecturesService } from "./lectures.service";

@Module({
    imports: [SequelizeModule.forFeature([Lecture]), TeachesModule],
    providers: [LecturesService],
    exports: [LecturesService],
})
export class LecturesModule {}
