import { Test, TestingModule } from '@nestjs/testing';
import { SpikeController } from './spike.controller';

describe('SpikeController', () => {
  let controller: SpikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpikeController],
    }).compile();

    controller = module.get<SpikeController>(SpikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
