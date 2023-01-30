import { ApiProperty } from "@nestjs/swagger";

export class VotteryPool {
  @ApiProperty({ description: "Vottery pool address", example: "0x234aef354..." })
  address: string;
  @ApiProperty({ description: "Vottery name", example: "Vottery Orai Vchain" })
  name: string;
  @ApiProperty({ description: "Validator address", example: "oraivaloper1ltr3sx9vm9hq4ueajvs7ng24gw3k8t9tn5lh6s" })
  validator: string;
  @ApiProperty({ description: "network id", example: "Oraichain" })
  network: string;
  @ApiProperty({ description: "Random number generate contract address", example: "0x1345345abe..." })
  rngContractAddress: string;
  @ApiProperty({ description: "Total Vottery created", example: 223 })
  totalVottery: number;
  @ApiProperty({ description: "Current Vottery deposited", example: "123456789" })
  totalDeposit?: number;
  config?: any;

}

export class Vottery {
  @ApiProperty({ description: "Vottery unique ID", example: "36635263" })
  id: string;
  @ApiProperty({ description: "Vottery total reWard", example: "12341243343" })
  totalRewards: string;
  @ApiProperty({ description: "Timestamp start Votter", example: 1675064005 })
  start: number;
  @ApiProperty({ description: "Timestamp end Votter", example: 1675074005 })
  end: number;
  @ApiProperty({ description: "Timestamp end claim reward Votter", example: 1675084005 })
  claimPeriod: number;
  config?: any;
}
