import { Test, TestingModule } from '@nestjs/testing';
import { MartController } from './mart.controller';
import { MartService } from './mart.service';

describe('MartController', () => {
  let controller: MartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MartController],
      providers: [MartService],
    }).compile();

    controller = module.get<MartController>(MartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
