import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Homework } from './entities/homework.entity';
import { RoomsService } from '../rooms/rooms.service';
import { TeachesService } from '../teaches/teaches.service';
import { HomeworkAttributes } from './interfaces/homework.interface';
import { Op, WhereOptions } from 'sequelize';
import { StudentAttributes } from '../students/interfaces/student.interface';
import { StudentsService } from '../students/students.service';
import { FindAllHomeworkDto } from './dto/findAll-homework.dto';


@Injectable()
export class HomeworksService {

  constructor(
    @InjectModel(Homework) private readonly HomeworkEntity: typeof Homework,
    private readonly roomsService: RoomsService,
    private readonly teachService: TeachesService,
    private readonly studentService: StudentsService,
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

  async findAll(query: FindAllHomeworkDto, page = 0) {
    const whereOptions: WhereOptions<HomeworkAttributes> = {};
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        whereOptions[key] = { [Op.regexp]: query[key] };
      }
    }
    return await this.HomeworkEntity.findAll({
      where: whereOptions,
      attributes: { exclude: ["teach_id"] },
      offset: page * 5,
      limit: 5,
      order: [["deadline_date", "ASC"]],
    });
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
  async findStudentHomeworks(student_id: StudentAttributes['student_id']) {
    const student = this.studentService.findOne({ student_id });
    if (!student)
      throw new NotFoundException("this student doesn't exist ..");
    const room_id = student['room_id'];
    return await this.findAll({ room_id });
  }

}
