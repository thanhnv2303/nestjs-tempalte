export const CACHE_VOTTERY_PREFIX = "vottery-contract";
export const CACHE_VOTTERY_POOL_PREFIX = "vottery-pool-contract";
export const CACHE_VOTTERY_RNG_PREFIX = "vottery-rng-contract";

export const VotteryAddresser = {
  getVotteryKey(address: string, id: string) {
    return CACHE_VOTTERY_PREFIX + "_" + address + "_" + id;
  },

  getVotteryPoolKey(address: string) {
    return CACHE_VOTTERY_POOL_PREFIX + "_" + address;
  },
  getRngContractKey(rngContractAddress, networkId) {
    return CACHE_VOTTERY_RNG_PREFIX + "_" + networkId + "_" + rngContractAddress;
  }

};



