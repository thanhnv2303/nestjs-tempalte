import { ApiProperty } from "@nestjs/swagger";

export class UpdateRNGContractAddress {
  @ApiProperty()
  rngContractAddress: string;
  @ApiProperty()
  rngNetwork: string;
}

export class UpdateVotteryPoolSchedular {
  @ApiProperty()
  automation: boolean;
  
  @ApiProperty()
  schedular: object;
}