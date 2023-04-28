import { Test, TestingModule } from '@nestjs/testing';
import { TeachesController } from './teaches.controller';
import { TeachesService } from './teaches.service';

describe('TeachesController', () => {
  let controller: TeachesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeachesController],
      providers: [TeachesService],
    }).compile();

    controller = module.get<TeachesController>(TeachesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
