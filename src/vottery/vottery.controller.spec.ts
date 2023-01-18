import { Test, TestingModule } from '@nestjs/testing';
import { VotteryController } from './vottery.controller';
import { VotteryService } from './vottery.service';

describe('VotteryController', () => {
  let controller: VotteryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotteryController],
      providers: [VotteryService],
    }).compile();

    controller = module.get<VotteryController>(VotteryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
