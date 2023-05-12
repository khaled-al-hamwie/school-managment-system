import { PartialType } from '@nestjs/swagger';
import { CreateWorkPeridDto } from './create-work-perid.dto';

export class UpdateWorkPeridDto extends PartialType(CreateWorkPeridDto) {}
