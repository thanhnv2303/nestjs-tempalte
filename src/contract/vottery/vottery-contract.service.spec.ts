import { VotteryContractService } from "./vottery-contract.service";

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
    const players = await service.getPlayers();
    console.log(players);
    const player = await service.getPlayerTicketCount({ addr: wallet.address });
    console.log(player);

    const winner = await service.getWinners();

    console.log(winner);

    const lotteryInfo = await service.getLotteryInformation();
    console.log(lotteryInfo);

  });

  it("should buy ticket", async function() {
    const ticketCountResponseBefore = await service.getPlayerTicketCount({ addr: wallet.address });
    console.log("ticketCountResponseBefore : ", ticketCountResponseBefore);

    const fee = {
      amount: [
        {
          denom: denom,
          amount: "2000"
        }
      ],
      gas: "20000000" // 180k
    };
    const funds = [
        {
          denom: denom,
          amount: "100000"
        }
      ]
    ;
    const tx = await service.buyTickets({ ticketCount: 1 }, fee, "thanh buy", funds);
    console.log(tx);
    const player = await service.getPlayers();
    console.log(player);
    const ticketCountResponse = await service.getPlayerTicketCount({ addr: wallet.address });
    console.log("ticketCountResponseAfter : ", ticketCountResponse);
  });
});
