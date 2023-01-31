import { ApiProperty } from "@nestjs/swagger";

enum FactoryState {
  WAITING,
  GENERATING,
  IDLE
}

export class VotteryRng {
  @ApiProperty({ description: "Vottery pool address", example: "0x234aef354..." })
  address: string;
  @ApiProperty({ description: "Vottery current state", example: FactoryState.WAITING })
  factoryState: FactoryState;
  @ApiProperty({ description: "Vottery number request", example: 12 })
  numberRequest: number;
}
