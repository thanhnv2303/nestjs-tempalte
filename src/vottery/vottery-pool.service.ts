import { Injectable } from "@nestjs/common";
import { CreateVotteryDto, CreateVotteryPoolDto } from "./dto/create-vottery.dto";
import { schedularCreateVotteryJob, schedularAddFundJob, removeRepeatableJob, removeDelayedJob } from "src/scheduler/producer"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { VotteryPool, VotteryPoolDocument } from "./schemas/vottery-pool.schema";

@Injectable()
export class VotteryPoolService {
  constructor(
    @InjectModel(VotteryPool.name) private readonly votteryPoolModel: Model<VotteryPoolDocument>,
  ) {}

  /**
   * This action adds a new vottery pool and return a Vottery Poll contract address
   * @param createVotteryPoolDto
   * @return address
   */
  create(createVotteryPoolDto: CreateVotteryPoolDto) {
    const address = "A234... : {a Vottery Poll contract address}";
    return address;
  }

  updateRngContractAddress(address, rngContractAddress) {
    return `This method update new rng contract address ${rngContractAddress} to vottery pool ${address}`;
  }

  findAll() {
    return `This action returns all vottery`;
  }

  findOne(address: string) {
    return `This action returns a vottery pool  ${address}`;
  }

  remove(address: string) {
    return;
  }

  /**
   * This method create new vottery from Vottery pool
   * @param address
   * @param createVotteryDto
   */
  createVottery(address: string, createVotteryDto: CreateVotteryDto) {
    return `This method create new Vottery from Votterry pool ${address}`;
  }

  /**
   * This method allows to withdraw fund from Vottery pool to operator address
   * @param address
   * @param amount
   */
  withdrawVotteryPoolFund(address: string, amount: string) {
    return `This method allows withdraw ${amount} token from Vottery pool ${address}to operator address`;
  }

  /**
   * This method allows to deposit more fund from operator address to Vottery pool
   * @param address
   * @param amount
   */
  depositVotteryPoolFund(address: string, amount: string) {
    return `This method allows to deposit ${amount} token from operator address to Vottery pool ${address}`;
  }

  /**
   * This method allows to update schedular vottery
   * @param address
   * @param automation
   * @param schedular
   */
  async updateVotteryPoolSchedular(address: string, automation: boolean, schedular: object) {
    const votteryPool = await this.votteryPoolModel.findOneAndUpdate(
      { address: address },
      { $set: { automation: automation, scheduler: schedular }},
      { returnDocument: 'after', upsert: true }
    ).exec();

    if (automation) {
      await schedularAddFundJob(`addFund-${votteryPool.network}`, votteryPool, schedular["addFundVotteryExpression"])
      await schedularCreateVotteryJob(`createVottery-${votteryPool.network}`, votteryPool, schedular["createVotteryExpression"])
    } else {
      await removeRepeatableJob(`addFund-${votteryPool.network}`)
      await removeRepeatableJob(`createVottery-${votteryPool.network}`)
      await removeDelayedJob(`addFund-${votteryPool.network}`)
      await removeDelayedJob(`createVottery-${votteryPool.network}`)
    }
    return votteryPool
  }
}
