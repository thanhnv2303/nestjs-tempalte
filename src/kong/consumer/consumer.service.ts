import { Injectable } from "@nestjs/common";
import { CreateConsumerDto } from "./dto/create-consumer.dto";
import { UpdateConsumerDto } from "./dto/update-consumer.dto";
import { KongService } from "../kong.service";
import { Consumer, GroupACL, ListConsumer, ListGroupACL } from "./entities/consumer.entity";
import { Logger } from "@nestjs/common/services/logger.service";

@Injectable()
export class ConsumerService {
  public logger: Logger;

  constructor(private readonly kongServices: KongService) {
    this.logger = new Logger();
  }

  create(createConsumerDto: CreateConsumerDto) {
    const path = "/consumers";
    const method = "post";
    try {
      const user = this.kongServices.sentRequestAdmin<Consumer>(method, path, createConsumerDto);
      return user;
    } catch (e) {
      this.logger.warn(e);
    }

  }

  async findAll(): Promise<Consumer[]> {
    const path = "/consumers";
    const method = "get";
    try {
      const users = (await this.kongServices.sentRequestAdmin<ListConsumer>(method, path)).data;
      return users;
    } catch (e) {
      this.logger.error(e);
    }

  }

  async findOne(consumerUsernameOrID: string): Promise<Consumer> {
    const path = "/consumers/" + consumerUsernameOrID;
    const method = "get";
    try {
      const user = await this.kongServices.sentRequestAdmin<Consumer>(method, path);
      return user;
    } catch (e) {
      this.logger.warn(e);
    }


  }

  update(consumerUsernameOrID: string, updateConsumerDto: UpdateConsumerDto): Promise<Consumer> {
    const path = "/consumers/" + consumerUsernameOrID;
    const method = "patch";
    const user = this.kongServices.sentRequestAdmin<Consumer>(method, path, updateConsumerDto);
    return user;
  }

  async remove(consumerUsernameOrID: string) {
    const path = "/consumers/" + consumerUsernameOrID;
    const method = "delete";
    try {
      await this.kongServices.sentRequestAdmin(method, path);
    } catch (e) {
      this.logger.warn(e);
    }

  }

  async addGroupACL(consumerUsernameOrID: string, group: string) {
    const path = "/consumers/" + consumerUsernameOrID + "/acls";
    const method = "post";
    try {
      return await this.kongServices.sentRequestAdmin<GroupACL>(method, path, { group: group });
    } catch (e) {
      this.logger.warn(e);
    }
  }

  async getAllGroupACL(consumerUsernameOrID: string): Promise<GroupACL[]> {
    const path = "/consumers/" + consumerUsernameOrID + "/acls";
    const method = "get";
    try {
      return (await this.kongServices.sentRequestAdmin<ListGroupACL>(method, path)).data;
    } catch (e) {
      this.logger.warn(e);
    }
  }

  async getGroupACL(consumerUsernameOrID: string, group: string): Promise<GroupACL> {
    const path = "/consumers/" + consumerUsernameOrID + "/acls/" + group;
    const method = "get";
    try {
      return await this.kongServices.sentRequestAdmin<GroupACL>(method, path, { group: group });
    } catch (e) {
      this.logger.warn(e);
    }
  }

  async deleteGroupACL(consumerUsernameOrID: string, group: string): Promise<GroupACL> {
    const path = "/consumers/" + consumerUsernameOrID + "/acls/" + group;
    const method = "delete";
    try {
      return await this.kongServices.sentRequestAdmin<GroupACL>(method, path);
    } catch (e) {
      this.logger.warn(e);
    }
  }

}
