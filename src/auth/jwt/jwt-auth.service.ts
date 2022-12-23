import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/user.entity";
import { JwtPayload } from "./jwt-auth.strategy";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthService {
  private applicationName;

  constructor(private jwtService: JwtService, configService: ConfigService) {
    this.applicationName = configService.get<string>("APPLICATION_NAME");
  }

  login(user: User) {
    const payload: JwtPayload = { username: user.username, sub: user._id, iss: this.applicationName };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken
    };
  }
}
