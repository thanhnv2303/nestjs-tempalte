import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { VotteryAddresser } from "./vottery.addresser";

@Injectable()
export class VotteryService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  findAll(votteryPoolAddress: string) {
    return `This action returns all vottery`;
  }

  async findOne(votteryPoolAddress, id) {
    const votteryKey = VotteryAddresser.getVotteryKey(votteryPoolAddress, id);
    let vottery = await this.cacheManager.get(votteryKey);
    if (!vottery) {
      // get vottery info
      vottery = {};
      // load to cache
      await this.cacheManager.set(votteryKey, vottery);
    }
    return vottery;
  }

  updateConfig(votteryAddress, id, config: any) {
    return;
  }

  /**
   * `Draw finnal number of vottery ${id}, pool ${votteryAddress}`
   * @param votteryAddress
   * @param id
   */
  drawFinalNumber(votteryAddress, id) {
    return `Draw finnal number of vottery ${id}, pool ${votteryAddress}`;
  }

  /**
   * Add fund ${amount}token to vottery ${id} of pool ${votteryAddress}
   * @param votteryAddress
   * @param id
   * @param amount
   */
  addFund(votteryAddress, id, amount: string) {
    return `Add fund ${amount}token to vottery ${id} of pool ${votteryAddress}`;
  }

  /**
   * `Withdraw fund ${amount}token to vottery ${id} of pool ${votteryAddress}`
   * @param votteryAddress
   * @param id
   * @param amount
   */
  recoverFund(votteryAddress, id, amount: string) {
    return `Withdraw fund ${amount}token to vottery ${id} of pool ${votteryAddress}`;
  }
}
