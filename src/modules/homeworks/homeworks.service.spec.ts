import { Test, TestingModule } from '@nestjs/testing';
import { HomeworksService } from './homeworks.service';

describe('HomeworksService', () => {
  let service: HomeworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeworksService],
    }).compile();

    service = module.get<HomeworksService>(HomeworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
