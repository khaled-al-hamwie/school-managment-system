import { Module } from '@nestjs/common';
import { HomeworksService } from './homeworks.service';
import { HomeworksController } from './homeworks.controller';
import { Homework } from './entities/homework.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomsModule } from '../rooms/rooms.module';
import { TeachesModule } from '../teaches/teaches.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Homework]),
    RoomsModule,
    TeachesModule
  ],
  controllers: [HomeworksController],
  providers: [HomeworksService]
})
export class HomeworksModule { }
