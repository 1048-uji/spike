import { Controller, Get } from '@nestjs/common';
import { SpikeService } from './spike.service';
 

@Controller('spike')
export class SpikeController {
    constructor(private spikeService: SpikeService) {}

    @Get('/ruta')
    async getRuta(){
        return this.spikeService.getRuta();
    }
    @Get('/carburantes')
    async getCarburantes(){
        return this.spikeService.getCarburante();
    }
    @Get('/luz')
    async getLuz(){
        return this.spikeService.getLuz();
    }
}
