import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { GROUP_ACL_ENUM, User, UserDocument } from "./user.entity";
import { Model } from "mongoose";
import { ConsumerService } from "../kong/consumer/consumer.service";


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private consumerService: ConsumerService) {
  }

  async create(user: CreateUserDto) {
    const createdUser = new this.userModel(user);

    const _user = await createdUser.save();
    _user.kongConsumer = await this.createKongConsumer(_user.username);
    return _user;
  }

  async createKongConsumer(username: string) {
    // create kong consumer
    const consumer = await this.consumerService.create({
      username: username,
      tags: ["auth-service"]
    });
    await this.consumerService.addGroupACL(username, GROUP_ACL_ENUM.bronzeUser);
    return consumer;
  }

  async findById(id: string) {
    const user: User = await this.userModel.findOne({ _id: id });
    user.kongConsumer = await this.getKongConsumer(user.username);
    return;
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username: username }).lean();
    user.kongConsumer = await this.getKongConsumer(user.username);
    return user;
  }

  async findByProviderId(providerId: string) {
    const user = await this.userModel.findOne({ providerId: providerId });
    user.kongConsumer = await this.getKongConsumer(user.username);
    return user;
  }

  async findByProviderNProviderId(provider: string, providerId: string) {
    const user = await this.userModel.findOne({ providerId: providerId, provider: provider });
    if (user) user.kongConsumer = await this.getKongConsumer(user.username);
    return user;
  }

  getKongConsumer(username: string) {
    return this.consumerService.findOne(username);
  }

  findAll() {
    return this.userModel.find();
  }

  findUserGroupAcls(username: string) {
    return this.consumerService.getAllGroupACL(username);
  }

  deleteUserGroupAcl(username: string, group: string) {
    return this.consumerService.deleteGroupACL(username, group);
  }

  async remove(username: string) {
    await this.userModel.deleteOne({ username: username });
    await this.consumerService.remove(username);
  }

}
