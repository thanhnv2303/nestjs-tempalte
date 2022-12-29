import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { GithubOauthGuard } from "./github-oauth.guard";
import { JwtAuthService } from "../jwt/jwt-auth.service";
import { FRONT_END_REDIRECT_URL, SESSION_COOKIE_KEY } from "src/config/constants";

@Controller("auth/github")
export class GithubOauthController {
  constructor(private jwtAuthService: JwtAuthService) {
  }

  @Get()
  @UseGuards(GithubOauthGuard)
  async googleAuth(@Req() _req) {
    // Guard redirects
    console.log(_req);
  }

  @Get("redirect")
  @UseGuards(GithubOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie(SESSION_COOKIE_KEY, accessToken, {
      httpOnly: true,
      sameSite: "lax"
    });
    const redirectLoginUrl = FRONT_END_REDIRECT_URL;
    return res.redirect(redirectLoginUrl + `?token=${accessToken}`);
    // return res.json({
    //   access_token: accessToken
    // });
  }
}
