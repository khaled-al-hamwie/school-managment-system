import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Exam } from "./entities/exam.entity";
import { ExamsController } from "./exams.controller";
import { ExamsService } from "./exams.service";

@Module({
    imports: [SequelizeModule.forFeature([Exam])],
    controllers: [ExamsController],
    providers: [ExamsService],
})
export class ExamsModule {}
