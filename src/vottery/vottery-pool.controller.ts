import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { VotteryService } from "./vottery.service";
import { CreateVotteryDto, CreateVotteryPoolDto } from "./dto/create-vottery.dto";
import { VotteryPoolService } from "./vottery-pool.service";
import { UpdateRNGContractAddress } from "./dto/update-vottery-pool.dto";

@Controller("vottery-pool")
export class VotteryPoolController {
  constructor(private readonly votteryPoolService: VotteryPoolService) {
  }

  @Post()
  create(@Body() createVotteryPoolDto: CreateVotteryPoolDto) {
    return this.votteryPoolService.create(createVotteryPoolDto);
  }


  @Get()
  findAll() {
    return this.votteryPoolService.findAll();
  }

  @Get(":address")
  findOne(@Param("address") address: string) {
    return this.votteryPoolService.findOne(address);
  }


  @Delete(":address")
  remove(@Param("address") address: string) {
    return this.votteryPoolService.remove(address);
  }

  @Post(":address/update-rng-contract")
  updateRngContractAddress(@Param("address") address: string, @Body() updateRNGContractAddress: UpdateRNGContractAddress) {
    return this.votteryPoolService.updateRngContractAddress(address, updateRNGContractAddress.rngContractAddress);
  }

  @Post(":address/create-vottery")
  createVottery(@Param("address") address: string, @Body() createVotteryDto: CreateVotteryDto) {
    return this.votteryPoolService.createVottery(address, createVotteryDto);
  }

  @Post(":address/deposit-vottery-pool-fund")
  depositVotteryPoolFund(@Param("address") address: string, @Param("amount") amount: string) {
    return this.votteryPoolService.depositVotteryPoolFund(address, amount);
  }

  @Post(":address/withdraw-vottery-pool-fund")
  withdrawVotteryPoolFund(@Param("address") address: string, @Param("amount") amount: string) {
    return this.votteryPoolService.withdrawVotteryPoolFund(address, amount);
  }


}
