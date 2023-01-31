import { Network, NETWORK_TYPE } from "./entities/network.entity";

export const Networks: Network[] = [
  {
    chain_id: "darchub",
    name: "Konstellation",
    rest: "https://node1.konstellation.tech:1318",
    rpc: "https://node1.konstellation.tech:26657",
    coingecko_id: "darcmatter-coin",
    type: NETWORK_TYPE.COSMOS
  },
  {
    chain_id: "cosmoshub-4",
    name: "cosmoshub",
    rest: "https://lcd-cosmoshub.blockapsis.com",
    rpc: "https://rpc-cosmoshub.blockapsis.com/",
    coingecko_id: "cosmos",
    type: NETWORK_TYPE.COSMOS

  },
  {
    chain_id: "Oraichain",
    name: "Oraichain mainnet",
    rest: "https://lcd.orai.io",
    rpc: "https://rpc.orai.io",
    coingecko_id: "oraichain-token",
    type: NETWORK_TYPE.COSMOS
  },
  {
    chain_id: "sifchain-1",
    name: "Sifchain",
    rest: "https://api-sifchain-ia.cosmosia.notional.ventures",
    rpc: "https://rpc-sifchain-ia.cosmosia.notional.ventures",
    coingecko_id: "oraichain-token",
    type: NETWORK_TYPE.COSMOS
  },
  {
    chain_id: "97",
    name: "BSC testnet",
    rest: "https://data-seed-prebsc-1-s3.binance.org:8545",
    rpc: "https://data-seed-prebsc-1-s3.binance.org:8545",
    coingecko_id: "bnb",
    type: NETWORK_TYPE.EVM
  }
];
