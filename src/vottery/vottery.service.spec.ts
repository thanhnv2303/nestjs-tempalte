import { Test, TestingModule } from '@nestjs/testing';
import { VotteryService } from './vottery.service';

describe('VotteryService', () => {
  let service: VotteryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotteryService],
    }).compile();

    service = module.get<VotteryService>(VotteryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
