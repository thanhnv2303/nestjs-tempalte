import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.entity";
import { Model } from "mongoose";

export const cacheUser: any = {};

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  create(user: CreateUserDto) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  findById(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username: username });
  }

  findByProviderId(providerId: string) {
    return this.userModel.findOne({ providerId: providerId });
  }

  findByProviderNProviderId(provider: string, providerId: string) {
    return this.userModel.findOne({ providerId: providerId, provider: provider });
  }


  findAll() {
    return this.userModel.find();
  }
}
