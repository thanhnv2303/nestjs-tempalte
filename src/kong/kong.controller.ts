import { Controller } from "@nestjs/common";
import { KongService } from "./kong.service";

@Controller()
export class KongController {
  constructor(private readonly kongService: KongService) {
  }

}
