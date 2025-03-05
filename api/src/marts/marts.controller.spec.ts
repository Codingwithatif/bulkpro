import { Test, TestingModule } from '@nestjs/testing';
import { MartsController } from './marts.controller';

describe('MartsController', () => {
  let controller: MartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MartsController],
    }).compile();

    controller = module.get<MartsController>(MartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
