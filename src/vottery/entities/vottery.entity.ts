import { ApiProperty } from "@nestjs/swagger";


export class Vottery {
  @ApiProperty({ description: "Vottery pool address", example: "0x234aef354..." })
  poolAddress: string;
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
  @ApiProperty({ description: "Random number generate contract address", example: "0x1345345abe..." })
  rngNetwork: string;
  @ApiProperty({ description: "Random number generate contract address", example: "0x1345345abe..." })
  rngContractAddress: string;
  @ApiProperty({ description: "Random number generate request index", example: "123234" })
  requestIndex: string;
  config?: any;
}
