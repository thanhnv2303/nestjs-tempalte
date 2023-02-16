import { VotteryFactoryClient } from "../lottery-contract/contracts/vottery-factory/ts/VotteryFactory.client";
import { Wallet } from "@tovchain/cosms";

export class VotteryFactoryContractService extends VotteryFactoryClient {
  constructor(contractAddress: string, wallet: Wallet) {
    super(wallet.cosmWasmSigner, wallet.address, contractAddress);
  }
}
