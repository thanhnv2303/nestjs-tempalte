import { Test, TestingModule } from "@nestjs/testing";
import { ContactService } from "./contact.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UpsetContactDto } from "./dto/upset-contact.dto";
import { MongooseModule } from "@nestjs/mongoose";
import { Contact, ContactSchema } from "./entities/contact.entity";
import * as mongoose from "mongoose";

describe("ContactService", () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true
        }),
        MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>("MONGODB_URI")
          }),
          inject: [ConfigService]
        })
      ]
    }).compile();

    service = module.get<ContactService>(ContactService);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    service.teleBot.sendMessage("1484971336", "hello222");
  });
  it("should be create contact", async () => {
    const fakeContact: UpsetContactDto = {
      email: "test2@gmail.com",
      enquiries: [
        {
          type: "Create Validator",
          message: "try it afasfasd",
          timestamp: new Date(),
          firstName: "test",
          lastName: "new",
          companyName: "tech"
        },
        {
          type: "Create Relayer",
          message: "try it ",
          timestamp: new Date(),
          firstName: "test",
          lastName: "new",
          companyName: "tech"
        }
      ]
    };
    await service.upset(fakeContact);

    const contact = await service.findByEmail(fakeContact.email);
    console.log(contact);

    await service.deleteByEmail(fakeContact.email);
  });
});
