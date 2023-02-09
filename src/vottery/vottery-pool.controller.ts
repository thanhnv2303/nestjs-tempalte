import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from "@nestjs/common";
import { CreateVotteryDto, CreateVotteryPoolDto } from "./dto/create-vottery.dto";
import { VotteryPoolService } from "./vottery-pool.service";
import { UpdateRNGContractAddress, UpdateVotteryPoolSchedular } from "./dto/update-vottery-pool.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags("Vottery Pool")
@Controller("vottery-pool")
export class VotteryPoolController {
  constructor(private readonly votteryPoolService: VotteryPoolService) {
  }

  @ApiOperation({ summary: "Create new Vottery pool" })
  @Post()
  create(@Body() createVotteryPoolDto: CreateVotteryPoolDto) {
    return this.votteryPoolService.create(createVotteryPoolDto);
  }


  @ApiOperation({ summary: "Get all vottery pool" })
  @Get()
  findAll() {
    return this.votteryPoolService.findAll();
  }

  @ApiOperation({ summary: "Get Vottery pool by address" })
  @Get(":address")
  findOne(@Param("address") address: string) {
    return this.votteryPoolService.findOne(address);
  }


  @ApiOperation({ summary: "Delete vottery pool" })
  @Delete(":address")
  remove(@Param("address") address: string) {
    return this.votteryPoolService.remove(address);
  }

  @ApiOperation({ summary: "Update rng contract to vottery pool" })
  @Post(":address/update-rng-contract")
  updateRngContractAddress(@Param("address") address: string, @Body() updateRNGContractAddress: UpdateRNGContractAddress) {
    return this.votteryPoolService.updateRngContractAddress(address, updateRNGContractAddress.rngContractAddress);
  }

  @ApiOperation({ summary: "Create new Vottery from Vottery pool" })
  @Post(":address/create-vottery")
  createVottery(@Param("address") address: string, @Body() createVotteryDto: CreateVotteryDto) {
    return this.votteryPoolService.createVottery(address, createVotteryDto);
  }

  @ApiOperation({ summary: "Deposit more fund to vottery pool" })
  @Post(":address/deposit-vottery-pool-fund")
  depositVotteryPoolFund(@Param("address") address: string, @Param("amount") amount: string) {
    return this.votteryPoolService.depositVotteryPoolFund(address, amount);
  }

  @ApiOperation({ summary: "Withdraw fund from vottery pool to owner fund address" })
  @Post(":address/withdraw-vottery-pool-fund")
  withdrawVotteryPoolFund(@Param("address") address: string, @Param("amount") amount: string) {
    return this.votteryPoolService.withdrawVotteryPoolFund(address, amount);
  }

  @ApiOperation({ summary: "Update vottery pool schedular information " })
  @Put(":address/schedular")
  schedular(@Param("address") address: string, @Body() updateVotteryPoolSchedular: UpdateVotteryPoolSchedular) {
    return this.votteryPoolService.updateVotteryPoolSchedular(address, updateVotteryPoolSchedular.automation, updateVotteryPoolSchedular.schedular);
  }
}
