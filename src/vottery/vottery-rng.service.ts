import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { ConfigService } from "@nestjs/config";
import { BigNumber, ethers, Wallet } from "ethers";
import { NetworkService } from "../network/network.service";
import { VotteryAddresser } from "./vottery.addresser";
import { RngContractService } from "../contract/rng/rng-contract.service";


@Injectable()
export class VotteryRNGService {
  private evmWallet: Wallet;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, configService: ConfigService, private readonly networkService: NetworkService) {
    const EVM_PRIVATE_KEY = configService.get<string>("EVM_PRIVATE_KEY");
    this.evmWallet = new Wallet(EVM_PRIVATE_KEY);
  }

  async getRNGContractService(address: string, network: string) {
    const key = VotteryAddresser.getRngContractKey(address, network);
    let rngContractService: RngContractService = await this.cacheManager.get(key);
    if (!rngContractService) {
      const networkInfo = await this.networkService.getNetworkById(network);
      const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpc);
      rngContractService = new RngContractService(address, provider, this.evmWallet);
      await this.cacheManager.set(key, rngContractService);
    }
    return rngContractService;
  }

  async updateTriggerTimestamp(address: string, network: string, timestamp: number) {
    const rngContractService = await this.getRNGContractService(address, network);
    return await rngContractService.updateTriggerTimestamp(timestamp);
  }

  async getFactoryState(address: string, network: string) {
    const rngContractService = await this.getRNGContractService(address, network);
    return await rngContractService.getFactoryState();
  }

  async getTriggerTimestamp(address: string, network: string) {
    const rngContractService = await this.getRNGContractService(address, network);
    const triggerTimestampBN = await rngContractService.getTriggerTimestamp();
    const triggerTimestamp = triggerTimestampBN.toNumber();
    const dateTime = new Date(triggerTimestamp * 1000);
    return {
      timestamp: triggerTimestamp,
      dateTime: dateTime
    };
  }

  async checkUpkeep(address: string, network: string) {
    const rngContractService = await this.getRNGContractService(address, network);
    return await rngContractService.checkUpkeep();
  }

  async performUpkeep(address: string, network: string) {
    const rngContractService = await this.getRNGContractService(address, network);
    return await rngContractService.performUpkeep();
  }

  async getRequestId(address: string, network: string, index: string) {
    const rngContractService = await this.getRNGContractService(address, network);
    try {
      return await rngContractService.getRequestId(BigNumber.from(index));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getRandomNumber(address: string, network: string, requestId: string) {
    const rngContractService = await this.getRNGContractService(address, network);
    return await rngContractService.getRandomNumber(BigNumber.from(requestId));
  }
}
