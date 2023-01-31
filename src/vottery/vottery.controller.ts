import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { VotteryService } from "./vottery.service";
import { AddFundVotteryDto, RecoverFundVotteryDto } from "./dto/update-vottery.dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Vottery } from "./entities/vottery.entity";

@ApiTags("Vottery")
@Controller("vottery")
export class VotteryController {
  constructor(private readonly votteryService: VotteryService) {
  }

  @ApiOperation({summary:'get all vottery by vottery pool address'})
  @Get(":address")
  @ApiOkResponse({
    description: "List votteries ",
    type: Vottery,
    isArray: true
  })
  findAll(@Param("address") address: string) {
    return this.votteryService.findAll(address);
  }

  @ApiOperation({summary:'Vottery by vottery pool address and id'})
  @Get(":address/:id")
  @ApiOkResponse({
    description: "vottery",
    type: Vottery,
    isArray: false
  })
  findOne(@Param("address") address: string, @Param("id") id: string) {
    return this.votteryService.findOne(address, id);
  }

  @ApiOperation({summary:'Draw final number of an ended vottery'})
  @Post(":address/:id/draw-final-number")
  drawFinalNumber(@Param("address") address: string, @Param("id") id: string) {
    return this.votteryService.drawFinalNumber(address, id);
  }

  @ApiOperation({summary:'Add more fund for enable vottery '})
  @Post(":address/:id/add-fund")
  addFund(@Param("address") address: string, @Param("id") id: string, @Body() addFundVotteryDto: AddFundVotteryDto) {
    return this.votteryService.addFund(address, id, addFundVotteryDto.amount);
  }

  @ApiOperation({summary:'Withdraw remain fund of Vottery when the claim reward duration pass'})
  @Post(":address/:id/recover-fund")
  recoverFund(@Param("address") address: string, @Param("id") id: string, @Body() recoverFundVotteryDto: RecoverFundVotteryDto) {
    return this.votteryService.recoverFund(address, id, recoverFundVotteryDto.amount);
  }

}
