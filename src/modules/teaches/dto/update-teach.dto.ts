import { PartialType } from '@nestjs/mapped-types';
import { CreateTeachDto } from './create-teach.dto';

export class UpdateTeachDto extends PartialType(CreateTeachDto) {}
