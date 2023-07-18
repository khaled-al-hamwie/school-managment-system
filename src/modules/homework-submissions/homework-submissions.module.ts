import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { HomeworkSubmission } from "./entities/homework-submission.entity";
import { HomeworkSubmissionsController } from "./homework-submissions.controller";
import { HomeworkSubmissionsService } from "./homework-submissions.service";

@Module({
    imports: [SequelizeModule.forFeature([HomeworkSubmission])],
    controllers: [HomeworkSubmissionsController],
    providers: [HomeworkSubmissionsService],
})
export class HomeworkSubmissionsModule {}
