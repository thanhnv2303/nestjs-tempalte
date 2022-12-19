import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { createSwagger } from "./common/setup/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createSwagger(app);

  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);

}

bootstrap();
