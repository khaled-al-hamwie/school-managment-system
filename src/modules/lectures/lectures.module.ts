import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Lecture } from "./entities/lecture.entity";
import { LecturesController } from "./lectures.controller";
import { LecturesService } from "./lectures.service";

@Module({
    imports: [SequelizeModule.forFeature([Lecture])],
    controllers: [LecturesController],
    providers: [LecturesService],
})
export class LecturesModule {}
