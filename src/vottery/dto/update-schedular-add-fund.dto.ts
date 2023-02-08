import { ApiProperty } from "@nestjs/swagger";

export class UpdateSchedularAddFund {
  @ApiProperty()
  addFundVotteryExpression: string;
}