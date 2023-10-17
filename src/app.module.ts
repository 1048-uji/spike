import { Module } from '@nestjs/common';
import { SpikeModule } from './spike/spike.module';

@Module({
  imports: [SpikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
