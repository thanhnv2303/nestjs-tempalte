import { Test, TestingModule } from '@nestjs/testing';
import { KongController } from './kong.controller';
import { KongService } from './kong.service';

describe('KongController', () => {
  let controller: KongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KongController],
      providers: [KongService],
    }).compile();

    controller = module.get<KongController>(KongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
