import { VotteryContractService } from "./vottery-contract.service";

import { config } from "dotenv";
import Cosm, { BaseProvider, Wallet } from "@tovchain/cosms";

config();
// const rpcUrl = "https://rpc.orai.io";
const rpcUrl = "https://testnet.rpc.orai.io";
let provider;
let cosm: Cosm;
let wallet: Wallet;
const prefix = "orai";
const denom = "orai";
const m = 'river art invite misery warm input decorate marriage grace already cabbage scout churn cart country laptop supreme pipe divide metal path same replace gather';
const VOTTERY_ADDRESS = "orai1ykh3sgq9ll6jy9u8jvvhycf004gyxvcxduvjsk9lv7k6uhxgre7spzwu7f";

let currentBlock;


describe("Test VotteryContractService", () => {
  let service: VotteryContractService;

  beforeAll(async () => {
    jest.setTimeout(30000);
    provider = new BaseProvider();
    await provider.connect(rpcUrl, prefix, denom);
    wallet = await Wallet.getWalletFromMnemonic(
      provider,
      m
    );

    service = new VotteryContractService(VOTTERY_ADDRESS, wallet);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should get info", async function() {
    const player =await service.getPlayers();
    console.log(player);

  });
  it("should buy ticket", async function() {

    const fee = {
      amount: [
        {
          denom: denom,
          amount: '2000'
        }
      ],
      gas: '20000000' // 180k
    };
    const funds = [
        {
          denom: denom,
          amount: '100000'
        }
      ]
    ;
    const tx =await service.buyTickets({ticketCount:1},fee,"thanh buy",funds);
    console.log(tx);
    const player =await service.getPlayers();
    console.log(player);
    const ticketCountResponse =await service.getPlayerTicketCount({addr:wallet.address});
    console.log(ticketCountResponse);
  });
});
