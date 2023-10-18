import { Module } from '@nestjs/common';
import { SpikeModule } from './spike/modules/spike.module';

@Module({
  imports: [SpikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
