import { VotteryFactoryContractService } from "./vottery-factory-contract.service";

import { config } from "dotenv";
import Cosm, { BaseProvider, Wallet } from "@tovchain/cosms";
import * as process from "process";

config();
// const rpcUrl = "https://rpc.orai.io";
const rpcUrl = "https://testnet.rpc.orai.io";
let provider;
let cosm: Cosm;
let wallet: Wallet;
const prefix = "orai";
const denom = "orai";
const m = process.env.COSMOS_MNMEMONIC;
const VOTTERY_ADDRESS = "orai1ykh3sgq9ll6jy9u8jvvhycf004gyxvcxduvjsk9lv7k6uhxgre7spzwu7f";

const fee = {
  amount: [
    {
      denom: denom,
      amount: "2000"
    }
  ],
  gas: "20000000" // 180k
};

describe("Test VotteryFactoryContractService", () => {
  let service: VotteryFactoryContractService;

  beforeAll(async () => {
    jest.setTimeout(30000);
    provider = new BaseProvider();
    await provider.connect(rpcUrl, prefix, denom);
    wallet = await Wallet.getWalletFromMnemonic(
      provider,
      m
    );

    service = new VotteryFactoryContractService(VOTTERY_ADDRESS, wallet);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should get info", async function() {
    const fundManagerResponse = await service.getFundManager();
    console.log(fundManagerResponse);

    await service.getNumberOfLottery();
    await service.getOwner();
    await service.getLotteryByIndex({ index: 0 });

  });
  it("should create vottery", async function() {

    const createVotteryDto = {
      cw20TokenAddress: "Addr;",
      denom: denom,
      durationMinutes: 1233434,
      fundingThreshold: "Uint128;",
      hasDistinctWinners: false,
      id: "string;",
      maxTicketsPerPlayer: 0,
      name: "string;",
      selection: {
        percent: {
          pct_player_count: 0.4
        }
      },
      ticketPrice: "10000orai"
    };

    const tx = await service.createLottery(createVotteryDto, fee, "thanh create");
    console.log(tx);

    const fundsDeposit = [
        {
          denom: denom,
          amount: "100000"
        }
      ]
    ;
    const tx2 = await service.depositFund({ denom: denom }, fee, "", fundsDeposit);
    console.log(tx2);


    const tx3 = await service.withdrawFund({ denom: denom }, fee, "");
    console.log(tx3);

  });
});
