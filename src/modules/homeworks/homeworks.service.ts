import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Homework } from './entities/homework.entity';
import { RoomsService } from '../rooms/rooms.service';
import { TeachesService } from '../teaches/teaches.service';
import { HomeworkAttributes } from './interfaces/homework.interface';
import { WhereOptions } from 'sequelize';


@Injectable()
export class HomeworksService {

  constructor(
    @InjectModel(Homework) private readonly HomeworkEntity: typeof Homework,
    private readonly roomsService: RoomsService,
    private readonly teachService: TeachesService,
  ) { }

  async create(createHomeworkDto: CreateHomeworkDto) {
    const myRoom = await this.roomsService.findOne({
      room_id: createHomeworkDto.room_id,
    });
    if (!myRoom)
      throw new NotFoundException("room doesn't exist");

    const myTeach = await this.teachService.findOne({
      teach_id: createHomeworkDto.teach_id,
    });
    if (!myTeach)
      throw new NotFoundException("teach doesn't exist");
    this.HomeworkEntity.create(createHomeworkDto);

    return "done";
  }

  async findAll() {
    return await this.HomeworkEntity.findAll();
  }

  async findOne(options: WhereOptions<HomeworkAttributes>) {
    return this.HomeworkEntity.findOne({
      where: options,
      limit: 1
    });
  }

  async update(homework_id: HomeworkAttributes['homework_id'],
    updateHomeworkDto: UpdateHomeworkDto) {
    const homework = await this.findOne({ homework_id });
    if (!homework)
      throw new NotFoundException("this homework doesn't exist");
    homework.update(updateHomeworkDto).then((output) => output.save());
    return "done";
  }

  remove(homework_id: HomeworkAttributes['homework_id']) {
    this.HomeworkEntity.destroy({ where: { homework_id } });
    return "done";
  }
}
