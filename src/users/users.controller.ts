import { Controller, Delete, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    const user = req.user;
    return this.usersService.findByUsername(user.username);
  }

  @Get("key-auths")
  @UseGuards(JwtAuthGuard)
  getKeyAuth(@Request() req) {
    const user = req.user;
    return this.usersService.getKongKeyAuths(user.username);
  }

  @Post("key-auth")
  @UseGuards(JwtAuthGuard)
  genKeyAuth(@Request() req) {
    const user = req.user;
    return this.usersService.createKongKeyAuth(user.username);
  }

  @Delete("key-auth")
  @UseGuards(JwtAuthGuard)
  async deleteKeyAuth(@Request() req) {
    const user = req.user;
    const key = req.query.key;
    await this.usersService.deleteKongKeyAuth(user.username, key);
    return `Key ${key} deleted`;
  }


}
