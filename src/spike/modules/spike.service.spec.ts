import { Test, TestingModule } from '@nestjs/testing';
import { SpikeService } from './spike.service';

describe('SpikeService', () => {
  let service: SpikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpikeService],
    }).compile();

    service = module.get<SpikeService>(SpikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
