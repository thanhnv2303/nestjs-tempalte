export class VotteryPool {
  address: string;
  name: string;
  validator: string;
  network: string;
  rngContractAddress:string;
  totalVottery: number;
  totalDeposit?: number;
  config?: any;

}

export class Vottery {
  id: string;
  totalRewards: number;
  start: number;
  end: number;
  claimPeriod: number;
  config?: any;
}
