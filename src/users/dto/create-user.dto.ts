import { Provider } from "../../common/types/provider";

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  username: string;
  name: string;
}
