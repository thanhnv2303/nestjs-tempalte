import { Module } from "@nestjs/common";
import { VotteryService } from "./vottery.service";
import { VotteryController } from "./vottery.controller";
import { VotteryRNGService } from "./vottery-rng.service";
import { VotteryPoolService } from "./vottery-pool.service";
import { VotteryPoolController } from "./vottery-pool.controller";
import { VotteryRngController } from "./vottery-rng.controller";

@Module({
  controllers: [VotteryController, VotteryPoolController, VotteryRngController],
  providers: [VotteryPoolService, VotteryService, VotteryRNGService]
})
export class VotteryModule {
}
