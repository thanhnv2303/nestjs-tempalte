import {Module} from '@nestjs/common';
import {VotteryService} from './vottery.service';
import {VotteryController} from './vottery.controller';
import {VotteryRNGService} from "./vottery-rng.service";
import {VotteryPoolService} from "./vottery-pool.service";

@Module({
    controllers: [VotteryController],
    providers: [VotteryPoolService, VotteryService, VotteryRNGService]
})
export class VotteryModule {
}
