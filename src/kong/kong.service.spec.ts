import { Test, TestingModule } from "@nestjs/testing";
import { KongService } from "./kong.service";
import { KongController } from "./kong.controller";
import { ConsumerModule } from "./consumer/consumer.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

describe("KongService", () => {
  let service: KongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      {
        controllers: [KongController],
        providers: [KongService],
        imports: [
          ConfigModule.forRoot({
            isGlobal: true
          }),
          ConsumerModule, HttpModule]
      }).compile();

    service = module.get<KongService>(KongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("health check", async () => {
    const data = await service.sentRequestAdmin("get", "/");
    console.log(data);
  });
});
