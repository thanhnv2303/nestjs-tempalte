import { ApiProperty } from "@nestjs/swagger";

export class AddFundVotteryDto {
  @ApiProperty()
  amount: string;
}

export class RecoverFundVotteryDto {
  @ApiProperty()
  amount: string;
}
