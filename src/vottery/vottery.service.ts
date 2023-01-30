import { Injectable } from "@nestjs/common";

@Injectable()
export class VotteryService {

  findAll(votteryAddress: string) {
    return `This action returns all vottery`;
  }

  findOne(votteryAddress, id) {
    return;
  }

  updateConfig(votteryAddress, id, config: any) {
    return;
  }

  drawFinalNumber(votteryAddress, id) {
    return;
  }

  addFund(votteryAddress, id, amount: string) {
    return;
  }

  recoverFund(votteryAddress, id, amount: string) {
    return;
  }
}
