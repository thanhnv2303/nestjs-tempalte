import { ApiProperty } from "@nestjs/swagger";

export class CreateVotteryDto {
  @ApiProperty()
  start: number;
  @ApiProperty()
  end: number;
  @ApiProperty()
  claimPeriod: number;
  @ApiProperty()
  config?: any;
}

export class CreateVotteryPoolDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  validator: string;
  @ApiProperty()
  network: string;
  @ApiProperty()
  rngContractAddress: string;
  @ApiProperty()
  rngNetwork: string;
}
