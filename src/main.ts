import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { createSwagger } from "./common/setup/swagger";
const API_DEFAULT_PREFIX = '/';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createSwagger(app);
  app.setGlobalPrefix(process.env.API_PREFIX || API_DEFAULT_PREFIX);

  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000,process.env.HOST || "0.0.0.0");

}

bootstrap();
