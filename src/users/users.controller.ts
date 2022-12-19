import { Controller, Get,Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller('users')
export class UsersController {
  constructor(private  readonly usersService: UsersService){}

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req){
    const user = req.user
    return this.usersService.findByUsername(user.username)
  }
}
