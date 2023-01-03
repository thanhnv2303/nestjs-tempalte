import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type ContactDocument = HydratedDocument<Contact>

export class Enquiry {
  @Prop({ type: Date, default: Date })
  timestamp?: Date;
  @ApiProperty()
  type: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  lastName?: string;
  @ApiProperty()
  companyName?: string;
}

@Schema()
export class Contact {


  @Prop({ require: true, unique: true, message: "email must be unique" })
  email: string;

  @Prop([Enquiry])
  enquiries: Enquiry[];
}


export const ContactSchema = SchemaFactory.createForClass(Contact);
ContactSchema.index({ email: "hashed" });
