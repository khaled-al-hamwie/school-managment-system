import { Injectable } from '@nestjs/common';
import { CreateWorkPeridDto } from './dto/create-work-perid.dto';
import { UpdateWorkPeridDto } from './dto/update-work-perid.dto';

@Injectable()
export class WorkPeridsService {
  create(createWorkPeridDto: CreateWorkPeridDto) {
    return 'This action adds a new workPerid';
  }

  findAll() {
    return `This action returns all workPerids`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workPerid`;
  }

  update(id: number, updateWorkPeridDto: UpdateWorkPeridDto) {
    return `This action updates a #${id} workPerid`;
  }

  remove(id: number) {
    return `This action removes a #${id} workPerid`;
  }
}
