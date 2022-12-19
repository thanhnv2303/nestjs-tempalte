import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./auth/jwt/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return `Hello world` ;
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getPrivate(@Request() req) {
    return req.user;
  }
}
