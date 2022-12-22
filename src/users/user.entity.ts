import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Provider } from "../common/types/provider";
import { HydratedDocument } from "mongoose";
import * as shortid from "shortid";

const ROLES = ["admin", "user"];

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false, timestamps: true })
export class User {
  // @Prop({ required: true, unique: true,type: MongooseSchema.Types.ObjectId })
  @Prop({ required: true, unique: true, type: String, default: shortid.generate })
  _id: string;

  @Prop()
  provider: Provider;

  @Prop()
  providerId: string;

  @Prop({ required: true, unique: true, message: "Name must be unique" })
  username: string;

  @Prop()
  name?: string;

  @Prop({ required: true, default: [ROLES[1]] })
  roles?: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: "hashed" });
