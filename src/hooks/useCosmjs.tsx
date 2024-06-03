import {
  Coin,
  GasPrice,
  SigningStargateClient,
  StargateClient,
} from "@cosmjs/stargate";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "./useWallet";

export enum VoteOption {
  VOTE_OPTION_YES = 1,
  VOTE_OPTION_ABSTAIN = 2,
  VOTE_OPTION_NO = 3,
  VOTE_OPTION_NO_WITH_VETO = 4,
}

export const useCosmjs = () => {
  const { chainId, userAddress } = useWallet();
  const rpcUrl = (chainId && chainInfoMap[chainId].rpc) || "";
  const offlineSigner = window.getOfflineSigner!(chainId!);
  const denom =
    chainId && chainInfoMap[chainId].stakeCurrency?.coinMinimalDenom;

  const getAvailableBalances = async () => {
    try {
      const client: StargateClient = await StargateClient.connect(rpcUrl);

      const balances: readonly Coin[] = await client.getAllBalances(
        userAddress!,
      );
      return balances;
    } catch (error) {
      throw error;
    }
  };

  const getStakeBalances = async () => {
    try {
      const client: StargateClient = await StargateClient.connect(rpcUrl);

      const balances: Coin | null = await client.getBalanceStaked(userAddress!);
      return balances;
    } catch (error) {
      throw error;
    }
  };

  const withdrawStakedReward = async (validatorAddress: string) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const delegateToken = async (validatorAddress: string, amount: string) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const undelegateToken = async (validatorAddress: string, amount: string) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const redelegateToken = async (
    validatorSourceAddress: string,
    validatorDestinationAddress: string,
    amount: string,
  ) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const voteProposal = async (proposalId: string, option: VoteOption) => {
    try {
      const signingClient = await SigningStargateClient.connectWithSigner(
        rpcUrl,
        offlineSigner,
        { gasPrice: GasPrice.fromString("0.025uatom") },
      );

      const fee = "auto";
      const memo = "";
      const message = [
        {
          typeUrl: "/cosmos.gov.v1beta1.MsgVote",
          value: {
            voter: userAddress!,
            proposalId: proposalId,
            option: option,
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
    } catch (error) {
      throw error;
    }
  };

  return {
    getStakeBalances,
    getAvailableBalances,
    withdrawStakedReward,
    delegateToken,
    undelegateToken,
    redelegateToken,
    voteProposal,
  };
};
