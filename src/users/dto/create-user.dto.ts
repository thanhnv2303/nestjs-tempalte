import { Provider } from "../../common/types/provider";

export class CreateUserDto {
  _id?: string;
  provider: Provider;
  providerId: string;
  username: string;
  name?: string;
}
