import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Provider } from "../common/types/provider";
import { HydratedDocument } from "mongoose";
import { v4 as uuid } from "uuid";

const ROLES = ["ADMIN", "USER"];

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  // @Prop({ required: true, unique: true,type: MongooseSchema.Types.ObjectId })
  @Prop({ required: true, unique: true, type: String, default: uuid })
  _id: string;

  @Prop()
  provider: Provider;

  @Prop()
  providerId: string;

  @Prop({ required: true, unique: true, message: "Name must be unique" })
  username: string;

  @Prop()
  name?: string;

  @Prop({ required: true, enum: ROLES, default: ROLES[1] })
  roles?: string;


  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: "hashed" });
