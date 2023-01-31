export enum NETWORK_TYPE {
  EVM,
  COSMOS
}

export class Network {
  chain_id: string;
  name: string;
  rest: string;
  rpc: string;
  coingecko_id: string;
  prefix?: string;
  image?: string;
  type: NETWORK_TYPE;
}
