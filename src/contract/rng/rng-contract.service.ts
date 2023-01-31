import * as RandomNumberGeneratorJson from "./artifacts/contracts/RandomNumberGenerator.sol/RandomNumberGenerator.json";
import { BigNumber, Contract, ContractFactory, ethers } from "ethers";
import { ContractInterface } from "@ethersproject/contracts/src.ts";
import { BaseProvider } from "@ethersproject/providers/src.ts/base-provider";
import { Signer } from "@ethersproject/abstract-signer/src.ts";
import { HttpException, HttpStatus } from "@nestjs/common";

enum RNG_EXCEPTION {
  CALL_ERROR = "CALL_ERROR",
}

function RNGCallContractException(message) {
  const error = new HttpException(message, HttpStatus.BAD_REQUEST);
  error.name = RNG_EXCEPTION.CALL_ERROR;
  return error;
}

RNGCallContractException.prototype = Object.create(Error.prototype);

export class RngContractService {
  get signer(): Signer {
    return this._signer;
  }

  set signer(value: Signer) {
    this._signer = value;
  }

  private _signer: Signer;

  get contract(): Contract {
    return this._contract;
  }

  set contract(value: Contract) {
    this._contract = value;
  }

  private _contract: Contract;

  get provider(): BaseProvider {
    return this._provider;
  }

  set provider(value: BaseProvider) {
    this._provider = value;
  }

  private _provider: BaseProvider;


  get factory(): ContractFactory {
    return this._factory;
  }

  set factory(value: ContractFactory) {
    this._factory = value;
  }

  private _factory: ContractFactory;

  private abi: ContractInterface;
  private _bytecode: string;

  constructor(address: string, provider?: BaseProvider, signer?: Signer) {
    this.abi = RandomNumberGeneratorJson.abi;
    this._bytecode = RandomNumberGeneratorJson.bytecode;
    this._factory = new ContractFactory(this.abi, this._bytecode);
    this._contract = this.factory.attach(address);
    this.connectProvider(provider);
    this.connectSigner(signer);
  }

  connectProvider(provider?: BaseProvider) {
    if (provider) {
      this.contract = this._contract.connect(provider);
      this.provider = provider;
    }
  }

  connectSigner(signer?: Signer) {
    if (!signer) return;
    if (this._provider) this._signer = signer.connect(this._provider);
    this.contract = this._contract.connect(this._signer);
  }

  attachNewAddress(address) {
    this._contract = this.factory.attach(address);
    this.connectProvider(this.provider);
    this.connectSigner(this.signer);
  }

  updateTriggerTimestamp(timestamp: number, config = {}) {
    return this.contract.updateTriggerTimestamp(timestamp, config);
  }

  async checkUpkeep(checkData = "") {
    const value = ethers.utils.formatBytes32String(checkData);
    const checkUpkeep = await this.contract.checkUpkeep(value);
    const upkeepNeeded = checkUpkeep.upkeepNeeded;
    return upkeepNeeded;
  }

  performUpkeep(callData = "", config = {}) {
    const value = ethers.utils.formatBytes32String(callData);
    return this.contract.performUpkeep(value, config);
  }

  getFactoryState() {
    return this.contract.getFactoryState();
  }

  getRequestConfirmations() {
    return this.contract.getRequestConfirmations();
  }

  getNumberOfRequests(): Promise<BigNumber> {
    return this.contract.getNumberOfRequests();
  }

  async getRequestId(index: BigNumber | number): Promise<BigNumber> {
    let requestId = undefined;

    try {
      requestId = await this.contract.getRequestId(index);
    } catch (e) {
      const maxIndex = await this.getNumberOfRequests();
      if (maxIndex.lte(index))
        throw RNGCallContractException(`call method get RequestId by index error: expect index < maxIndex = ${maxIndex}, got: ${index} `);
      throw e;
    }

    return requestId;
  }

  getTriggerTimestamp(): Promise<BigNumber> {
    return this.contract.getTriggerTimestamp();
  }

  async getRandomNumber(requestId: BigNumber): Promise<BigNumber> {
    const r: BigNumber = await this.contract.getRandomNumber(requestId);
    if (r.eq(0)) throw RNGCallContractException(`requestId ${requestId._hex} not found`);
    return r;
  }

}
