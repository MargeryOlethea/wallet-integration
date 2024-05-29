import { useWallet } from "./useWallet";
import { Coin, StargateClient } from "@cosmjs/stargate";

export const useCosmjs = () => {
  const { network, userAddress } = useWallet();
  const rpcEndpoint = network.rpcUrl;

  const getBalances = async () => {
    console.log({ network, userAddress }, "ini lohhhh");
    const client: StargateClient = await StargateClient.connect(rpcEndpoint);

    if (userAddress) {
      const balances: readonly Coin[] = await client.getAllBalances(
        userAddress,
      );
      return balances;
    }
  };

  return { getBalances };
};
