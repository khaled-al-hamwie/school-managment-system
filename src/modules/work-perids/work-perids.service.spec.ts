import { Test, TestingModule } from '@nestjs/testing';
import { WorkPeridsService } from './work-perids.service';

describe('WorkPeridsService', () => {
  let service: WorkPeridsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkPeridsService],
    }).compile();

    service = module.get<WorkPeridsService>(WorkPeridsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
