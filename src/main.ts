import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { createSwagger } from "./common/setup/swagger";
import * as fs from "fs";

const API_DEFAULT_PREFIX = "/";

async function bootstrap() {

  let httpsOptions;
  if (!process.env.HTTPS_ENABLE || process.env.HTTPS_ENABLE === "1") {
    httpsOptions = {
      key: fs.readFileSync("./secrets/private-key.pem"),
      cert: fs.readFileSync("./secrets/public-certificate.pem")
    };
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });
  createSwagger(app);
  app.setGlobalPrefix(process.env.API_PREFIX || API_DEFAULT_PREFIX);

  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000, process.env.HOST || "0.0.0.0");

}

bootstrap();
