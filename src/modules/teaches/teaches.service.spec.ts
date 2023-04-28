import { Test, TestingModule } from '@nestjs/testing';
import { TeachesService } from './teaches.service';

describe('TeachesService', () => {
  let service: TeachesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeachesService],
    }).compile();

    service = module.get<TeachesService>(TeachesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
