import { Test, TestingModule } from "@nestjs/testing";
import { ConsumerService } from "./consumer.service";
import { ConfigModule } from "@nestjs/config";
import { ConsumerModule } from "./consumer.module";
import { KongModule } from "../kong.module";

describe("ConsumerService", () => {
  let service: ConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      {
        controllers: [],
        providers: [ConsumerService],
        imports: [
          ConfigModule.forRoot({
            isGlobal: true
          }),
          KongModule,
          ConsumerModule
        ]
      }).compile();

    service = module.get<ConsumerService>(ConsumerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be CURD User", async () => {
    const userName = "tt";
    //delete user if exist
    await service.remove(userName);

    //create user
    const user = await service.create({
      username: userName,
      custom_id: "tt",
      tags: [
        "hello", "world"
      ]
    });

    // get all users
    const users = await service.findAll();

    //get one User
    const getedUser = await service.findOne("tt");

    //update User
    const updatedUser = await service.update("tt", {
      username: "tt",
      custom_id: "tt2"
    });

    // remove user
    await service.remove("tt");
  });
  it("should be CURD GroupAlc", async () => {
    const userName = "tt2";
    const userId = "tt2";


    //delete user if exist
    await service.remove(userName);

    //create user
    const user = await service.create({
      username: userName,
      custom_id: userId
    });

    const groupName = "test";
    //add Group ALCs
    const group = await service.addGroupACL(userName, groupName);

    //get All groups
    const groups = await service.getAllGroupACL(userName);

    // get user group
    const getGroup = await service.getGroupACL(userName, groupName);

    //delete userGroup
    await service.deleteGroupACL(userName, groupName);

    // get user group again
    const getAgainGroup = await service.getGroupACL(userName, groupName);
    console.log(getAgainGroup);

    await service.remove(userName);
  });

});
