import {
  Coin,
  GasPrice,
  SigningStargateClient,
  StargateClient,
} from "@cosmjs/stargate";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "./useWallet";

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

  const withdrawStakedReward = async (validatorAddress: string) => {
    const offlineSigner = window.getOfflineSigner!(chainId!);
    const signingClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner,
      { gasPrice: GasPrice.fromString("0.025uatom") },
    );

    const fee = "auto";
    const memo = "";

    const result = await signingClient.withdrawRewards(
      userAddress!,
      validatorAddress,
      fee,
      memo,
    );

    return result;
  };

  const delegateToken = async (validatorAddress: string, amount: string) => {
    const denom =
      chainId && chainInfoMap[chainId].stakeCurrency?.coinMinimalDenom;
    const offlineSigner = window.getOfflineSigner!(chainId!);
    const signingClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner,
      { gasPrice: GasPrice.fromString("0.025uatom") },
    );

    const fee = "auto";
    const memo = "";

    const result = await signingClient.delegateTokens(
      userAddress!,
      validatorAddress,
      { amount: amount, denom: denom! },
      fee,
      memo,
    );

    return result;
  };

  const undelegateToken = async (validatorAddress: string, amount: string) => {
    const denom =
      chainId && chainInfoMap[chainId].stakeCurrency?.coinMinimalDenom;
    const offlineSigner = window.getOfflineSigner!(chainId!);
    const signingClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner,
      { gasPrice: GasPrice.fromString("0.025uatom") },
    );

    const fee = "auto";
    const memo = "";

    const result = await signingClient.undelegateTokens(
      userAddress!,
      validatorAddress,
      { amount: amount, denom: denom! },
      fee,
      memo,
    );

    return result;
  };

  const redelegateToken = async (
    validatorSourceAddress: string,
    validatorDestinationAddress: string,
    amount: string,
  ) => {
    const denom =
      chainId && chainInfoMap[chainId].stakeCurrency?.coinMinimalDenom;
    const offlineSigner = window.getOfflineSigner!(chainId!);
    const signingClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner,
      { gasPrice: GasPrice.fromString("0.025uatom") },
    );

    const fee = "auto";
    const memo = "";
    const message = [
      {
        typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
        value: {
          amount: { amount: amount, denom: denom! },
          delegatorAddress: userAddress!,
          validatorSrcAddress: validatorSourceAddress,
          validatorDstAddress: validatorDestinationAddress,
        },
      },
    ];

    const result = await signingClient.signAndBroadcast(
      userAddress!,
      message,
      fee,
      memo,
    );
    return result;
  };

  return {
    getStakeBalances,
    getAvailableBalances,
    withdrawStakedReward,
    delegateToken,
    undelegateToken,
    redelegateToken,
  };
};
