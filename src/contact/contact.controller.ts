import { Body, Controller, Post, Response } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { UpsetContactDto } from "./dto/upset-contact.dto";
import isEmail from "validator/lib/isEmail";
import { ApiBadRequestResponse, ApiOkResponse } from "@nestjs/swagger";

@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {
  }

  @Post()
  @ApiBadRequestResponse({ status: 400, description: "Invalid email " })
  @ApiOkResponse({ status: 200, description: "Submit success." })
  async create(@Body() upsetContactDto: UpsetContactDto, @Response() res) {
    if (!isEmail(upsetContactDto.email)) {
      return res.status(400).send(`Invalid email "${upsetContactDto.email}"`);
    }

    for (const upsetContactDtoElement of upsetContactDto.enquiries) {
      upsetContactDtoElement.timestamp = new Date();
    }
    await this.contactService.upset(upsetContactDto);
    return res.status(200).send(`Submit success.`);
  }

}
