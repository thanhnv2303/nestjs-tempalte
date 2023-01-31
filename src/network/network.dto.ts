import { NETWORK_TYPE } from "./entities/network.entity";

export class NetworkDTO {
  chain_id: string;
  name: string;
  rpc?: string;
  rest?: string;
  description?: Description[];
  image: string;
  type: NETWORK_TYPE;
}

export class Description {
  key: string;
  value: any;
}
