import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { GROUP_ACL_ENUM, User, UserDocument } from "./user.entity";
import { Model } from "mongoose";
import { ConsumerService } from "../kong/consumer/consumer.service";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class UsersService {
  private applicationName;
  private jwt_secret;

  constructor(configService: ConfigService, @InjectModel(User.name) private userModel: Model<UserDocument>, private consumerService: ConsumerService) {
    this.applicationName = configService.get<string>("APPLICATION_NAME");
    this.jwt_secret = configService.get<string>("JWT_SECRET");
  }

  async create(user: CreateUserDto) {
    const createdUser = new this.userModel(user);

    const _user = await createdUser.save();
    _user.kongConsumer = await this.createKongConsumer(_user.username);
    return _user;
  }

  async createKongConsumer(username: string) {
    const APPLICATION_NAME = this.applicationName;
    const JWT_SECRET = this.jwt_secret;

    // create kong consumer
    const consumer = await this.consumerService.create({
      username: username,
      tags: [APPLICATION_NAME]
    });
    await this.consumerService.addGroupACL(username, GROUP_ACL_ENUM.bronzeUser);
    const key = APPLICATION_NAME + "/" + username;
    await this.consumerService.addCredentialJWT(username, key, JWT_SECRET);
    return consumer;
  }

  async createConsumerCredentialJWT(username) {
    await this.consumerService.addCredentialJWT(username, this.applicationName, this.jwt_secret);
  }

  async findById(id: string) {
    const user: User = await this.userModel.findOne({ _id: id });
    if (user) user.kongConsumer = await this.getKongConsumer(user.username);
    return;
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username: username }).lean();
    if (user) user.kongConsumer = await this.getKongConsumer(user.username);
    return user;
  }

  async findByProviderId(providerId: string) {
    const user = await this.userModel.findOne({ providerId: providerId });
    if (user) user.kongConsumer = await this.getKongConsumer(user.username);
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

  createKongKeyAuth(username: string) {
    return this.consumerService.addCredentialKeyAuth(username);
  }

  deleteKongKeyAuth(username: string, key: string) {
    return this.consumerService.deleteCredentialKeyAuth(username, key);
  }

  getKongKeyAuths(username: string) {
    return this.consumerService.getAllCredentialKeyAuth(username);
  }

  async remove(username: string) {
    await this.userModel.deleteOne({ username: username });
    await this.consumerService.remove(username);
  }

}
