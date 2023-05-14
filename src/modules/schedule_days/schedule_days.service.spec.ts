import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleDaysService } from './schedule_days.service';

describe('ScheduleDaysService', () => {
  let service: ScheduleDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleDaysService],
    }).compile();

    service = module.get<ScheduleDaysService>(ScheduleDaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
