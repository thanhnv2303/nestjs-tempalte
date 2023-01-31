import { Controller, Get, Post, Param, Query } from "@nestjs/common";
import { VotteryRNGService } from "./vottery-rng.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Vottery RNG")
@Controller("vottery-rng")
export class VotteryRngController {
  constructor(private readonly votteryRngService: VotteryRNGService) {
  }

  @Post(":address/update-trigger-timestamp")
  @ApiOperation({ summary: "Create a trigger timestamp to generate a random number" })
  async updateTriggerTimestamp(@Param("address") address: string, @Query("network") network: string, @Query("timestamp") timestamp: number) {
    return await this.votteryRngService.updateTriggerTimestamp(address, network, timestamp);
  }


  @ApiOperation({ summary: "Check random number generate current is available" })
  @Get(":address/check-upkeep")
  checkUpkeep(@Param("address") address: string, @Query("network") network: string) {
    return this.votteryRngService.checkUpkeep(address, network);
  }
  @ApiOperation({ summary: "Check random number generate current is available" })
  @Get(":address/factory-state")
  getFactoryState(@Param("address") address: string, @Query("network") network: string) {
    return this.votteryRngService.getFactoryState(address, network);
  }
  @ApiOperation({ summary: "Check random number generate current is available" })
  @Get(":address/trigger-timestamp")
  getTriggerTimestamp(@Param("address") address: string, @Query("network") network: string) {
    return this.votteryRngService.getTriggerTimestamp(address, network);
  }

  @ApiOperation({ summary: "Generate new random number" })
  @Post(":address/perform-upkeep")
  performUpkeep(@Param("address") address: string, @Query("network") network: string) {
    return this.votteryRngService.performUpkeep(address, network);
  }

  @ApiOperation({ summary: "Get request id by index request" })
  @Get(":address/get-request-id")
  getRequestId(@Param("address") address: string, @Query("network") network: string, @Query("index") index: string) {
    return this.votteryRngService.getRequestId(address, network, index);
  }

  @ApiOperation({ summary: "Get random number from request id" })
  @Get(":address/get-random-number")
  getRandomNumber(@Param("address") address: string, @Query("network") network: string, @Query("requestId") requestId: string) {
    return this.votteryRngService.getRandomNumber(address, network, requestId);
  }
}
