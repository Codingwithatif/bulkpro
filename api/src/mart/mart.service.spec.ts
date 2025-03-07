import { Test, TestingModule } from '@nestjs/testing';
import { MartService } from './mart.service';

describe('MartService', () => {
  let service: MartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MartService],
    }).compile();

    service = module.get<MartService>(MartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
