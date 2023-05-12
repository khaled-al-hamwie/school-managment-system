import { Module } from '@nestjs/common';
import { WorkPeridsService } from './work-perids.service';
import { WorkPeridsController } from './work-perids.controller';

@Module({
  controllers: [WorkPeridsController],
  providers: [WorkPeridsService]
})
export class WorkPeridsModule {}
