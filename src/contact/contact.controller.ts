import { Body, Controller, Post, Response } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { UpsetContactDto } from "./dto/upset-contact.dto";
import isEmail from "validator/lib/isEmail";

@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {
  }

  @Post()
  async create(@Body() upsetContactDto: UpsetContactDto, @Response() res) {
    if (!isEmail(upsetContactDto.email)) {
      return res.status(406).send(`Invalid email ${upsetContactDto.email}`);
    }

    for (const upsetContactDtoElement of upsetContactDto.enquiries) {
      upsetContactDtoElement.timestamp = new Date();
    }
    await this.contactService.upset(upsetContactDto);
    return res.status(200).send(`Submit success.`);
  }

}
