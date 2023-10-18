import { Module } from '@nestjs/common';
import { SpikeController } from './spike.controller';
import { SpikeService } from './spike.service';

@Module({
  controllers: [SpikeController],
  providers: [SpikeService]
})
export class SpikeModule {}
