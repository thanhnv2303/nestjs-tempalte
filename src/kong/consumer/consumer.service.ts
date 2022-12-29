import { Injectable } from "@nestjs/common";
import { CreateConsumerDto } from "./dto/create-consumer.dto";
import { UpdateConsumerDto } from "./dto/update-consumer.dto";
import { KongService } from "../kong.service";
import {
  Consumer,
  CredentialJWT,
  CredentialJWTAlgorithm,
  CredentialKeyAuth,
  GroupACL,
  ListConsumer,
  ListCredentialJWT,
  ListCredentialKeyAuth,
  ListGroupACL
} from "./entities/consumer.entity";
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

    const user = this.kongServices.sentRequestAdmin<Consumer>(method, path, createConsumerDto);
    return user;


  }

  async findAll(): Promise<Consumer[]> {
    const path = "/consumers";
    const method = "get";
    const users = (await this.kongServices.sentRequestAdmin<ListConsumer>(method, path)).data;
    return users;

  }

  async findOne(consumerUsernameOrID: string): Promise<Consumer> {
    const path = "/consumers/" + consumerUsernameOrID;
    const method = "get";

    const user = await this.kongServices.sentRequestAdmin<Consumer>(method, path);
    return user;


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

    await this.kongServices.sentRequestAdmin(method, path);


  }

  async addGroupACL(consumerUsernameOrID: string, group: string) {
    const path = "/consumers/" + consumerUsernameOrID + "/acls";
    const method = "post";

    return await this.kongServices.sentRequestAdmin<GroupACL>(method, path, { group: group });

  }

  async getAllGroupACL(consumerUsernameOrID: string): Promise<GroupACL[]> {
    const path = "/consumers/" + consumerUsernameOrID + "/acls";
    const method = "get";

    return (await this.kongServices.sentRequestAdmin<ListGroupACL>(method, path)).data;

  }

  async getGroupACL(consumerUsernameOrID: string, group: string): Promise<GroupACL> {
    const path = "/consumers/" + consumerUsernameOrID + "/acls/" + group;
    const method = "get";

    return await this.kongServices.sentRequestAdmin<GroupACL>(method, path, { group: group });

  }

  async deleteGroupACL(consumerUsernameOrID: string, group: string): Promise<GroupACL> {
    const path = "/consumers/" + consumerUsernameOrID + "/acls/" + group;
    const method = "delete";

    return await this.kongServices.sentRequestAdmin<GroupACL>(method, path);

  }

  async addCredentialJWT(
    consumerUsernameOrID: string,
    key?: string,
    secret?: string,
    algorithm: CredentialJWTAlgorithm = CredentialJWTAlgorithm.HS256,
    rsa_public_key?: string
  ) {
    const path = "/consumers/" + consumerUsernameOrID + "/jwt";
    const method = "post";

    return await this.kongServices.sentRequestAdmin<CredentialJWT>(method, path, {
      key: key,
      secret: secret,
      algorithm: algorithm,
      rsa_public_key: rsa_public_key
    });

  }

  async getAllCredentialJWT(consumerUsernameOrID: string): Promise<CredentialJWT[]> {
    const path = "/consumers/" + consumerUsernameOrID + "/jwt";
    const method = "get";

    return (await this.kongServices.sentRequestAdmin<ListCredentialJWT>(method, path)).data;

  }

  async getCredentialJWT(consumerUsernameOrID: string, credentialJwtKeyOrId: string): Promise<CredentialJWT> {
    const path = "/consumers/" + consumerUsernameOrID + "/jwt/" + credentialJwtKeyOrId;
    const method = "get";

    return await this.kongServices.sentRequestAdmin<CredentialJWT>(method, path);

  }

  async deleteCredentialJWT(consumerUsernameOrID: string, credentialJwtKeyOrId: string) {
    const path = "/consumers/" + consumerUsernameOrID + "/jwt/" + credentialJwtKeyOrId;
    const method = "delete";

    return await this.kongServices.sentRequestAdmin(method, path);

  }

  async addCredentialKeyAuth(
    consumerUsernameOrID: string,
    key?: string
  ) {
    const path = "/consumers/" + consumerUsernameOrID + "/key-auth";
    const method = "post";
    let body = {};
    if (key) {
      body = { key: key };
    }
    return await this.kongServices.sentRequestAdmin<CredentialKeyAuth>(method, path, body);

  }

  async getAllCredentialKeyAuth(consumerUsernameOrID: string): Promise<CredentialKeyAuth[]> {
    const path = "/consumers/" + consumerUsernameOrID + "/key-auth";
    const method = "get";

    return (await this.kongServices.sentRequestAdmin<ListCredentialKeyAuth>(method, path)).data;

  }

  async getCredentialKeyAuth(consumerUsernameOrID: string, key: string): Promise<CredentialKeyAuth> {
    const path = "/consumers/" + consumerUsernameOrID + "/key-auth/" + key;
    const method = "get";

    return await this.kongServices.sentRequestAdmin<CredentialKeyAuth>(method, path);

  }

  async deleteCredentialKeyAuth(consumerUsernameOrID: string, key: string) {
    const path = "/consumers/" + consumerUsernameOrID + "/key-auth/" + key;
    const method = "delete";

    return await this.kongServices.sentRequestAdmin(method, path);

  }

}
