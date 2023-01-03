import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { Logger } from "@nestjs/common/services/logger.service";

const logger = new Logger();

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    const startTime = new Date().getTime();
    next();
    res.on("close", () => {
      try {
        const { statusCode } = res;
        const contentLength = res.get("content-length");

        logger.log(`${getTimeDelta(startTime)}ms ${contentLength} ${req.ip} ${statusCode} ${req.method} ${getUrl(req)}`);
        const code = res.statusCode;

      } catch (e) {
        logger.error(`${getTimeDelta(startTime)}ms ${req.ip} ${e.status} ${req.method} ${getUrl(req)}`);
        logger.error(e);
      }
    });
  }


}

function getTimeDelta(startTime: number): number {
  return new Date().getTime() - startTime;
}

function getUrl(request: Request): string {
  return `${request.protocol}://${request.get("host")}${request.originalUrl}`;
}
