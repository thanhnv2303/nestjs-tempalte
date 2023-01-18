export class VotteryPool {
    address: string;
    name: string;
    validator: string;
    totalVottery: number;
    network: string;
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
