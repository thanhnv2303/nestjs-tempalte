/**
 * The defaults below are dedicated to Swagger configuration, change them
 * following your needs (change at least the title & description).
 *
 * @todo Change the constants below following your API requirements
 */
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const SWAGGER_TITLE = process.env.SWAGGER_TITLE || "Passenger API";
const SWAGGER_DESCRIPTION = process.env.SWAGGER_DESCRIPTION || "API used for passenger management";
const SWAGGER_PREFIX = process.env.SWAGGER_PREFIX || "/docs";
const SWAGGER_VERSION = process.env.SWAGGER_VERSION || "1.0.0";
const SWAGGER_ENABLE = process.env.SWAGGER_ENABLE

/**
 * Register a Swagger module in the NestJS application.
 * This method mutates the given `app` to register a new module dedicated to
 * Swagger API documentation. Any request performed on `SWAGGER_PREFIX` will
 * receive a documentation page as response.
 *
 * @todo See the `nestjs/swagger` NPM package documentation to customize the
 *       code below with API keys, security requirements, tags and more.
 */
export function createSwagger(app: INestApplication) {
  if (!(!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === "1")) {
    return;
  }

  const version = SWAGGER_VERSION;

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}
