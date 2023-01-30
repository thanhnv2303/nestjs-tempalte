import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { createSwagger } from "./common/setup/swagger";
import * as fs from "fs";
import { SCHEDULER_DASHBOARD_PATH } from "./scheduler/const";
import dashboard from "./scheduler/dashboard";

const API_DEFAULT_PREFIX = "/";

async function bootstrap() {

  let httpsOptions;
  if (process.env.HTTPS_ENABLE && process.env.HTTPS_ENABLE === "1") {
    httpsOptions = {
      key: fs.readFileSync("./secrets/private-key.pem"),
      cert: fs.readFileSync("./secrets/public-certificate.pem")
    };
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.setGlobalPrefix(process.env.API_PREFIX || API_DEFAULT_PREFIX);

  createSwagger(app);

  // app.use(SCHEDULER_DASHBOARD_PATH, serverAdapter.getRouter());
  app.use(SCHEDULER_DASHBOARD_PATH, dashboard.router);

  await app.listen(process.env.PORT || 3000, process.env.HOST || "0.0.0.0");

}

bootstrap();
