import { PartialType } from '@nestjs/swagger';
import { CreatePrizeDto } from './create-prize.dto';

export class UpdatePrizeDto extends PartialType(CreatePrizeDto) {}
