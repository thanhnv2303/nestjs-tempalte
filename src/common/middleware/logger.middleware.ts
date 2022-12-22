import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { Logger } from "@nestjs/common/services/logger.service";

const logger = new Logger();

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = new Date().getTime();
    try {
      // console.log("hello");
      next();
      const code = res.statusCode;
      // const code2 = res.statusCode;
      const responseStatus = res.statusCode;
      logger.log(`${getTimeDelta(startTime)}ms ${req.ip} ${responseStatus} ${req.method} ${getUrl(req)}`);

    } catch (e) {
      logger.error(`${getTimeDelta(startTime)}ms ${req.ip} ${e.status} ${req.method} ${getUrl(req)}`);
      logger.error(e);
    }

  }


}

function getTimeDelta(startTime: number): number {
  return new Date().getTime() - startTime;
}

function getUrl(request: Request): string {
  return `${request.protocol}://${request.get("host")}${request.originalUrl}`;
}
