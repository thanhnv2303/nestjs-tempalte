import { Module } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { ContactController } from "./contact.controller";
import { MongooseModule } from "@nestjs/mongoose";

import { Contact, ContactSchema } from "./entities/contact.entity";

@Module({
  controllers: [ContactController],
  imports: [MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])],
  providers: [ContactService]
})
export class ContactModule {
}
