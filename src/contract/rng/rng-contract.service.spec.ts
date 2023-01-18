import { RngContractService } from "./rng-contract.service";
import { BigNumber, ethers, Wallet } from "ethers";


const TEST_NET_RPC = "https://data-seed-prebsc-1-s3.binance.org:8545/";
const EVM_PRIVATE_KEY = "bcd445830848c4cc02d0dfe1ecd2389906f848c0345afd13f3b8c66566092a98";
const RNG_CONTRACT_ADDRESS = "0x2d264001d152c08f4b8ef602fbd6733e316e7acc";


describe("RngContractService", () => {
  let service: RngContractService;

  beforeAll(async () => {
    jest.setTimeout(30000);
    const wallet = new Wallet(EVM_PRIVATE_KEY);
    const provider = new ethers.providers.JsonRpcProvider(TEST_NET_RPC);
    service = new RngContractService(RNG_CONTRACT_ADDRESS, provider, wallet);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Schedule update timestamp", async () => {
    // schedule update

    const tx = await service.updateTriggerTimestamp(Math.floor(Date.now() / 1000))
    console.log("tx");
    console.log(tx);

    const checkUpkeep = await service.checkUpkeep();
    const upkeepNeeded = checkUpkeep.upkeepNeeded;
    console.log("upkeepNeeded : ", upkeepNeeded);


    const txPerformUpkeep = await service.performUpkeep("");

    console.log("txPerformUpkeep : ", txPerformUpkeep);

    const numberRequests:BigNumber = await service.getNumberOfRequests();
    const latestRequestId:BigNumber = await service.getRequestId(numberRequests.sub(BigNumber.from(1)) );
    const randomNumber =  await service.getRandomNumber(latestRequestId)
    console.log(randomNumber.toString());

  });

});
