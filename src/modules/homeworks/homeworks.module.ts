import { Module } from '@nestjs/common';
import { HomeworksService } from './homeworks.service';
import { HomeworksController } from './homeworks.controller';
import { Homework } from './entities/homework.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomsModule } from '../rooms/rooms.module';
import { TeachesModule } from '../teaches/teaches.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Homework]),
    RoomsModule,
    TeachesModule,
    StudentsModule,
  ],
  controllers: [HomeworksController],
  providers: [HomeworksService],
  exports: [HomeworksService],
})
export class HomeworksModule { }
