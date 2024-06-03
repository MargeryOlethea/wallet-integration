import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "./useWallet";
import { RewardsData } from "@/types/reward.types";

export const useDistributionApi = () => {
  const { userAddress, chainId } = useWallet();
  const baseUrl = (chainId && chainInfoMap[chainId].rest) || "";

  const getRewardsByDelegator = async () => {
    const path =
      "/cosmos/distribution/v1beta1/delegators/" + userAddress + "/rewards";
    const response = await fetch(baseUrl + path);
    const myRewards: RewardsData = await response.json();
    return myRewards;
  };

  return { getRewardsByDelegator };
};
