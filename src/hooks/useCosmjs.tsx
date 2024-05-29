import { useEffect, useState } from "react";
import { useWallet } from "./useWallet";
import { Coin, StargateClient } from "@cosmjs/stargate";
import { chainInfoMap } from "@/constants/chainInfoMap";

export const useCosmjs = () => {
  const { chainId, userAddress } = useWallet();
  const rpcUrl = (chainId && chainInfoMap[chainId].rpc) || "";

  const getAvailableBalances = async () => {
    const client: StargateClient = await StargateClient.connect(rpcUrl);

    if (userAddress) {
      const balances: readonly Coin[] = await client.getAllBalances(
        userAddress,
      );
      return balances;
    } else {
      return;
    }
  };

  const getStakeBalances = async () => {
    const client: StargateClient = await StargateClient.connect(rpcUrl);

    if (userAddress) {
      const balances: Coin | null = await client.getBalanceStaked(userAddress);
      return balances;
    } else {
      return;
    }
  };

  return { getStakeBalances, getAvailableBalances };
};
