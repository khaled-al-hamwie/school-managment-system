import { Module } from '@nestjs/common';
import { TeachesService } from './teaches.service';
import { TeachesController } from './teaches.controller';

@Module({
  controllers: [TeachesController],
  providers: [TeachesService]
})
export class TeachesModule {}
