import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { VotteryService } from "./vottery.service";
import { AddFundVotteryDto, RecoverFundVotteryDto } from "./dto/update-vottery.dto";

@Controller("vottery")
export class VotteryController {
  constructor(private readonly votteryService: VotteryService) {
  }


  @Get(":address")
  findAll(@Param("address") address: string) {
    return this.votteryService.findAll(address);
  }

  @Get(":address/:id")
  findOne(@Param("address") address: string, @Param("id") id: string) {
    return this.votteryService.findOne(address, id);
  }

  @Post(":address/:id/draw-final-number")
  drawFinalNumber(@Param("address") address: string, @Param("id") id: string) {
    return this.votteryService.drawFinalNumber(address, id);
  }

  @Post(":address/:id/add-fund")
  addFund(@Param("address") address: string, @Param("id") id: string, @Body() addFundVotteryDto: AddFundVotteryDto) {
    return this.votteryService.addFund(address, id, addFundVotteryDto.amount);
  }

  @Post(":address/:id/recover-fund")
  recoverFund(@Param("address") address: string, @Param("id") id: string, @Body() recoverFundVotteryDto: RecoverFundVotteryDto) {
    return this.votteryService.addFund(address, id, recoverFundVotteryDto.amount);
  }

}
