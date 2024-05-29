import { useEffect, useState } from "react";
import { useWallet } from "./useWallet";
import { Coin, StargateClient } from "@cosmjs/stargate";

export const useCosmjs = () => {
  const { network, userAddress } = useWallet();
  const [rpcEndpoint, setRpcEndPoint] = useState(network.rpcUrl);

  const getAvailableBalances = async () => {
    const client: StargateClient = await StargateClient.connect(network.rpcUrl);

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
    const client: StargateClient = await StargateClient.connect(network.rpcUrl);

    if (userAddress) {
      const balances: Coin | null = await client.getBalanceStaked(userAddress);
      return balances;
    } else {
      return;
    }
  };

  return { getStakeBalances, getAvailableBalances };
};
