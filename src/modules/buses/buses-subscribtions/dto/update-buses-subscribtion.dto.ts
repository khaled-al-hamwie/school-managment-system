import { PartialType } from '@nestjs/swagger';
import { CreateBusesSubscribtionDto } from './create-buses-subscribtion.dto';

export class UpdateBusesSubscribtionDto extends PartialType(CreateBusesSubscribtionDto) {}
