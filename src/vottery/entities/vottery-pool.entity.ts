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
  @ApiProperty({ description: "Random number generate contract network id", example: "0x97" })
  rngNetwork: string;
  @ApiProperty({ description: "Random number generate contract address", example: "0x1345345abe..." })
  rngContractAddress: string;
  @ApiProperty({ description: "Total Vottery created", example: 223 })
  totalVottery: number;
  @ApiProperty({ description: "Current Vottery deposited", example: "123456789" })
  totalDeposit?: string;
  config?: any;
  @ApiProperty({ description: "Vottery Pool auto run enable , default is false", example: false })
  automation?: boolean;
  @ApiProperty({
    description: "Vottery Pool auto run scheduler",
    example: {
      createVotteryExpression: "0 0 12 ? * SUN"
    }
  })
  scheduler?;
}

export class VotteryScheduler {
  @ApiProperty({ description: "Vottery Pool auto run enable , default is false", example: false })
  createVotteryExpression: string;
  @ApiProperty({ description: "Vottery Pool auto run enable , default is false", example: false })
  addFundVotteryExpression: string;
  @ApiProperty({ description: "Timestamp end claim reward Votter", example: 1675084005 })
  votteryDuration: number;
  @ApiProperty({ description: "Timestamp end claim reward Votter", example: 1675084005 })
  claimPeriod: number;
}


