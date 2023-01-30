import { Controller, Get, Post, Param } from "@nestjs/common";
import { VotteryRNGService } from "./vottery-rng.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Vottery RNG")
@Controller("vottery-rng")
export class VotteryRngController {
  constructor(private readonly votteryRngService: VotteryRNGService) {
  }

  @Post(":address/update-trigger-timestamp")
  @ApiOperation({ summary: "Create a trigger timestamp to generate a random number" })
  updateTriggerTimestamp(@Param("address") address: string) {
    return this.votteryRngService.updateTriggerTimestamp(address);
  }


  @ApiOperation({ summary: "Check random number generate current is available" })
  @Get(":address/check-upkeep")
  checkUpkeep(@Param("address") address: string, @Param("requestId") requestId: string) {
    return this.votteryRngService.checkUpkeep(address, requestId);
  }

  @ApiOperation({ summary: "Generate new random number" })
  @Post(":address/perform-upkeep")
  performUpkeep(@Param("address") address: string) {
    return this.votteryRngService.performUpkeep(address);
  }

  @ApiOperation({ summary: "Get request id by index request" })
  @Get(":address/get-request-id")
  getRequestId(@Param("address") address: string, @Param("index") index: string) {
    return this.votteryRngService.getRequestId(address, index);
  }

  @ApiOperation({ summary: "Get random number from request id" })
  @Get(":address/get-random-number")
  getRandomNumber(@Param("address") address: string, @Param("requestId") requestId: string) {
    return this.votteryRngService.getRandomNumber(address, requestId);
  }
}
