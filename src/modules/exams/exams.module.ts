import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { GradesModule } from "../grades/grades.module";
import { SubjectsModule } from "../subjects/subjects.module";
import { TeachesModule } from "../teaches/teaches.module";
import { Exam } from "./entities/exam.entity";
import { ExamsController } from "./exams.controller";
import { ExamsService } from "./exams.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Exam]),
        TeachesModule,
        SubjectsModule,
        GradesModule,
    ],
    controllers: [ExamsController],
    providers: [ExamsService],
})
export class ExamsModule {}
