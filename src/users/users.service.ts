import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { v4 as uuid } from 'uuid';

export const cacheUser: any = {};

@Injectable()
export class UsersService {

  create(user: CreateUserDto) {
    const key = `${user.provider}_${user.providerId}`;
    const id = uuid();
    cacheUser[key] = { ...user, ...{ id } };

    return cacheUser[key];
  }

  findOne(param) {
    const key = `${param.where.provider}_${param.where.providerId}`;
    return cacheUser[key];
  }

  findByUsername(username) {
    for (const [ k,v ] of Object.entries(cacheUser)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (v.username && v.username === username) {
        return v;
      }
    }
    return {};
  }

  findAll(param) {
    return Object.values(cacheUser);
  }
}
