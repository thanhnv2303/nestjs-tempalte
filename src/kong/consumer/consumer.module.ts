import { Module } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { KongModule } from "../kong.module";

@Module({
  imports: [KongModule],
  providers: [ConsumerService],
  exports: [ConsumerService]

})
export class ConsumerModule {
}
