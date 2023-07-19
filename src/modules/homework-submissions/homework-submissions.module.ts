import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { HomeworksModule } from "../homeworks/homeworks.module";
import { StudentsModule } from "../students/students.module";
import { HomeworkSubmission } from "./entities/homework-submission.entity";
import { HomeworkSubmissionsController } from "./homework-submissions.controller";
import { HomeworkSubmissionsService } from "./homework-submissions.service";

@Module({
    imports: [
        SequelizeModule.forFeature([HomeworkSubmission]),
        HomeworksModule,
        StudentsModule,
    ],
    controllers: [HomeworkSubmissionsController],
    providers: [HomeworkSubmissionsService],
})
export class HomeworkSubmissionsModule {}
