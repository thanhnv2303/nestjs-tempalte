import { Injectable } from "@nestjs/common";

import * as TeleBot from "telebot";
import { ConfigService } from "@nestjs/config";
import { Contact, ContactDocument } from "./entities/contact.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpsetContactDto } from "./dto/upset-contact.dto";

@Injectable()
export class ContactService {
  teleBot: any;
  private chatIds: string[];

  constructor(configService: ConfigService, @InjectModel(Contact.name) private contactModel: Model<ContactDocument>) {
    const telegrambottoken = configService.get<string>("TELEGRAM_BOT_TOKEN");
    const chatIds = configService.get<string>("TELEGRAM_CHAT_IDS");
    try {
      this.chatIds = chatIds.split(",").map(element => element.trim());
    } catch (e) {
      console.log(`error chat ids :"${chatIds}" , ${e}`);
    }

    try {
      this.teleBot = new TeleBot({
        token: telegrambottoken
      });
    } catch (e) {
      console.log(`Tele bot isn't set with invalid token "${telegrambottoken}", please recheck`);
      console.log(e);
    }
  }

  notifyContactSubmit(upsetContactDto: UpsetContactDto) {
    let message = `
Email: ${upsetContactDto.email} 
Enquiries:`;
    for (const enquiry of upsetContactDto.enquiries) {
      message += `
    First name: ${enquiry.firstName}
    Last name: ${enquiry.lastName}
    Company name: ${enquiry.companyName}
    Type: ${enquiry.type}
    Message: ${enquiry.message}
      `;
    }
    for (const chatId of this.chatIds) {
      this.teleBot.sendMessage(chatId, message);
    }

  }

  upset(upsetContactDto: UpsetContactDto, limitEnquiries = 100) {
    const filter = { email: upsetContactDto.email };
    const update = {
      $set: {
        email: upsetContactDto.email
      },
      $push: {
        enquiries: {
          $each: upsetContactDto.enquiries,
          $sort: { timestamp: -1 },
          $slice: limitEnquiries
        }
      }
    };
    try {
      this.notifyContactSubmit(upsetContactDto);
    } catch (e) {
      console.log(`Notify contact Summit error :${e}`);
    }

    return this.contactModel.findOneAndUpdate(filter, update, { upsert: true, new: true });
  }

  findAll() {
    return this.contactModel.find();
  }

  async findByEmail(email: string): Promise<Contact> {
    return this.contactModel.findOne({ email: email });
  }

  async deleteByEmail(email: string): Promise<any> {
    return this.contactModel.deleteOne({ email: email });
  }

}
