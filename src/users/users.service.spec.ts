import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ConsumerModule } from "../kong/consumer/consumer.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.entity";
import { faker } from "@faker-js/faker";

describe("UserService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>("MONGODB_URI")
          }),
          inject: [ConfigService]
        }),
        ConsumerModule
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be defined", async () => {

    const provider = "local";
    const providerId = faker.datatype.hexadecimal(10);
    const username = faker.internet.email();
    const name = faker.name.findName();
    // create user
    const user = await service.create({
      provider: provider,
      providerId: providerId,
      username: username,
      name: name
    });

    //get user
    const getUser = await service.findByUsername(username);

    //delete user
    await  service.remove(username)

    //get user again
    const getAgainUser = await service.findByUsername(username);
    console.log("done!");


  });
});
