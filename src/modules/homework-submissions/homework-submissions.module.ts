import { Module } from '@nestjs/common';
import { HomeworkSubmissionsService } from './homework-submissions.service';
import { HomeworkSubmissionsController } from './homework-submissions.controller';

@Module({
  controllers: [HomeworkSubmissionsController],
  providers: [HomeworkSubmissionsService]
})
export class HomeworkSubmissionsModule {}
