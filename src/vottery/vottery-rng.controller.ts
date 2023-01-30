import { Controller, Get, Post, Param } from "@nestjs/common";
import { VotteryRNGService } from "./vottery-rng.service";

@Controller("vottery-rng")
export class VotteryRngController {
  constructor(private readonly votteryRngService: VotteryRNGService) {
  }

  @Post(":address/update-trigger-timestamp")
  updateTriggerTimestamp(@Param("address") address: string) {
    return this.votteryRngService.updateTriggerTimestamp(address);
  }

  @Get(":address/check-upkeep")
  checkUpkeep(@Param("address") address: string, @Param("requestId") requestId: string) {
    return this.votteryRngService.checkUpkeep(address, requestId);
  }

  @Post(":address/perform-upkeep")
  performUpkeep(@Param("address") address: string) {
    return this.votteryRngService.performUpkeep(address);
  }

  @Get(":address/get-request-id")
  getRequestId(@Param("address") address: string, @Param("index") index: string) {
    return this.votteryRngService.getRequestId(address, index);
  }

  @Get(":address/get-random-number")
  getRandomNumber(@Param("address") address: string, @Param("requestId") requestId: string) {
    return this.votteryRngService.getRandomNumber(address, requestId);
  }
}
