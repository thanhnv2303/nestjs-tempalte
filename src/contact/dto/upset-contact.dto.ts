import { Enquiry } from "../entities/contact.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpsetContactDto {
  @ApiProperty()
  email: string;
  @ApiProperty({ type: () => [Enquiry] })
  enquiries: Enquiry[];
}
