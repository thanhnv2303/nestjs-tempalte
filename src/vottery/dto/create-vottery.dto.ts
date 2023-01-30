export class CreateVotteryDto {
  start: number;
  end: number;
  claimPeriod: number;
  config?: any;
}

export class CreateVotteryPoolDto {
  name: string;
  validator: string;
  network: string;
  rngContractAddress: string;
}
