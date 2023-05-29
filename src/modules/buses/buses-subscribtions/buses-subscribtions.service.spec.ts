import { Test, TestingModule } from '@nestjs/testing';
import { BusesSubscribtionsService } from './buses-subscribtions.service';

describe('BusesSubscribtionsService', () => {
  let service: BusesSubscribtionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusesSubscribtionsService],
    }).compile();

    service = module.get<BusesSubscribtionsService>(BusesSubscribtionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
