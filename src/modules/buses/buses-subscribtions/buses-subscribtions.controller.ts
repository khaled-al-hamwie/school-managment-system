import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusesSubscribtionsService } from './buses-subscribtions.service';
import { CreateBusesSubscribtionDto } from './dto/create-buses-subscribtion.dto';
import { UpdateBusesSubscribtionDto } from './dto/update-buses-subscribtion.dto';

@Controller('buses-subscribtions')
export class BusesSubscribtionsController {
  constructor(private readonly busesSubscribtionsService: BusesSubscribtionsService) {}

  @Post()
  create(@Body() createBusesSubscribtionDto: CreateBusesSubscribtionDto) {
    return this.busesSubscribtionsService.create(createBusesSubscribtionDto);
  }

  @Get()
  findAll() {
    return this.busesSubscribtionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busesSubscribtionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusesSubscribtionDto: UpdateBusesSubscribtionDto) {
    return this.busesSubscribtionsService.update(+id, updateBusesSubscribtionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busesSubscribtionsService.remove(+id);
  }
}
