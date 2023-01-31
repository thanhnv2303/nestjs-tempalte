import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Networks } from "./Networks";
import { Network } from "./entities/network.entity";

@Injectable()
export class NetworkService {
  async getNetworkById(chainId: string): Promise<Network> {
    const network = Networks.find(e => e.chain_id == chainId);
    if (!network) throw new HttpException(`Network ${chainId} is not supported`, HttpStatus.BAD_REQUEST);
    return network;
  }

  async getAll(): Promise<Network[]> {
    // return Networks;

    const networks = Networks;
    return networks;
  }
}
