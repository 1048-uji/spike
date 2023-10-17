import { Controller, Get } from '@nestjs/common';
import { SpikeService } from './spike.service'; 

@Controller('spike')
export class SpikeController {
    constructor(private spikeService: SpikeService) {}

    @Get()
    async getSpike(){
        return this.spikeService.getSpike();
    }
}
