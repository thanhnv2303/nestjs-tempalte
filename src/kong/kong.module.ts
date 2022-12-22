import { forwardRef, Module } from "@nestjs/common";
import { KongService } from "./kong.service";
import { KongController } from "./kong.controller";
import { ConsumerModule } from "./consumer/consumer.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [KongController],
  providers: [KongService],
  imports: [
    forwardRef(() => ConsumerModule),
    HttpModule,
    ConfigModule
  ],
  exports: [KongService]
})
export class KongModule {
}
