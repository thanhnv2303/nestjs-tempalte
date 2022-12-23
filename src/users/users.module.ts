import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.entity";
import { ConsumerModule } from "../kong/consumer/consumer.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConsumerModule,
    ConfigModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {
}
