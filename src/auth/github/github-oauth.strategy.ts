import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service";

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      clientID: configService.get<string>("OAUTH_GITHUB_ID"),
      clientSecret: configService.get<string>("OAUTH_GITHUB_SECRET"),
      callbackURL: configService.get<string>("OAUTH_GITHUB_REDIRECT_URL")
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile,
    done: any
  ) {
    const { id, username, emails } = profile;

    // let user = await this.usersService.findByProviderNProviderId("github", id);
    let _username = username;
    let email = null;
    if (emails && emails.length>0){
      _username = emails[0].value
      email = emails[0].value
    }
    let user = await this.usersService.findByUsername(_username);
    if (!user) {
      user = await this.usersService.create({
        provider: "github",
        providerId: id,
        name: username,
        username: _username,
        email: email
      });
    }

    if (!user.kongConsumer) {
      user.kongConsumer = await this.usersService.createKongConsumer(user.username);
    }

    return user;
  }
}
