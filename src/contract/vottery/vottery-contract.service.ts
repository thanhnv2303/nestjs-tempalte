import { LotterySmartContractClient } from "../lottery-contract/contracts/vottery/ts/LotterySmartContract.client";
import { Wallet } from "@tovchain/cosms";

export class VotteryContractService extends LotterySmartContractClient {
  constructor(contractAddress: string, wallet: Wallet) {
    super(wallet.cosmWasmSigner, wallet.address, contractAddress);
  }
}
