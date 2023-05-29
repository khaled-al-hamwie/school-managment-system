import { Injectable } from '@nestjs/common';
import { CreateBusesSubscribtionDto } from './dto/create-buses-subscribtion.dto';
import { UpdateBusesSubscribtionDto } from './dto/update-buses-subscribtion.dto';

@Injectable()
export class BusesSubscribtionsService {
  create(createBusesSubscribtionDto: CreateBusesSubscribtionDto) {
    return 'This action adds a new busesSubscribtion';
  }

  findAll() {
    return `This action returns all busesSubscribtions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} busesSubscribtion`;
  }

  update(id: number, updateBusesSubscribtionDto: UpdateBusesSubscribtionDto) {
    return `This action updates a #${id} busesSubscribtion`;
  }

  remove(id: number) {
    return `This action removes a #${id} busesSubscribtion`;
  }
}
