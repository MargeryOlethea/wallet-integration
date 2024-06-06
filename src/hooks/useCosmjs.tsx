import {
  Coin,
  GasPrice,
  SigningStargateClient,
  StargateClient,
} from "@cosmjs/stargate";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "./useWallet";
import { signEvmWithKeplr } from "@/utils/signEvmWithKeplr";
import { signAndBroadcastTransaction } from "@/utils/signAndBroadcastTransaction";

export enum VoteOption {
  VOTE_OPTION_YES = 1,
  VOTE_OPTION_ABSTAIN = 2,
  VOTE_OPTION_NO = 3,
  VOTE_OPTION_NO_WITH_VETO = 4,
}

export const useCosmjs = () => {
  const { chainId, userAddress, wallet } = useWallet();
  const rpcUrl = (chainId && chainInfoMap[chainId].rpc) || "";
  const restUrl = (chainId && chainInfoMap[chainId].rest) || "";
  const denom =
    chainId && chainInfoMap[chainId].stakeCurrency?.coinMinimalDenom;

  const getAvailableBalance = async () => {
    const client: StargateClient = await StargateClient.connect(rpcUrl);

    const balance = await client.getBalance(userAddress!, denom!);
    return balance;
  };

  const getStakeBalance = async () => {
    const client: StargateClient = await StargateClient.connect(rpcUrl);

    const balance: Coin | null = await client.getBalanceStaked(userAddress!);
    return balance;
  };

  const withdrawStakedReward = async (validatorAddress: string) => {
    const offlineSigner =
      wallet && wallet === "keplr"
        ? window.getOfflineSigner!(chainId!)
        : window.leap.getOfflineSigner!(chainId!);

    const signingClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner!,
      { gasPrice: GasPrice.fromString("0.025uatom") },
    );

    const fee = "auto";
    const memo = "";
    const messages = [
      {
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: {
          delegatorAddress: userAddress!,
          validatorAddress: validatorAddress,
        },
      },
    ];

    return await signAndBroadcastTransaction({
      signingClient,
      offlineSigner,
      chainId,
      restUrl,
      userAddress,
      messages,
      fee,
      memo,
      denom,
    });
  };

  const delegateToken = async (validatorAddress: string, amount: string) => {
    const offlineSigner =
      wallet && wallet === "keplr"
        ? window.getOfflineSigner!(chainId!)
        : window.leap.getOfflineSigner!(chainId!);

    const signingClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner!,
      { gasPrice: GasPrice.fromString("0.025uatom") },
    );

    const fee = "auto";
    const memo = "";
    const messages = [
      {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: {
          delegatorAddress: userAddress!,
          validatorAddress: validatorAddress,
          amount: { amount: amount, denom: denom! },
        },
      },
    ];

    return await signAndBroadcastTransaction({
      signingClient,
      offlineSigner,
      chainId,
      restUrl,
      userAddress,
      messages,
      fee,
      memo,
      denom,
    });
  };

  const undelegateToken = async (validatorAddress: string, amount: string) => {
    const offlineSigner =
      wallet && wallet === "keplr"
        ? window.getOfflineSigner!(chainId!)
        : window.leap.getOfflineSigner!(chainId!);

    const signingClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner!,
      { gasPrice: GasPrice.fromString("0.025uatom") },
    );

    const fee = "auto";
    const memo = "";
    const messages = [
      {
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: {
          delegatorAddress: userAddress!,
          validatorAddress: validatorAddress,
          amount: { amount: amount, denom: denom! },
        },
      },
    ];

    return await signAndBroadcastTransaction({
      signingClient,
      offlineSigner,
      chainId,
      restUrl,
      userAddress,
      messages,
      fee,
      memo,
      denom,
    });
  };

  const redelegateToken = async (
    validatorSourceAddress: string,
    validatorDestinationAddress: string,
    amount: string,
  ) => {
    const offlineSigner =
      wallet && wallet === "keplr"
        ? window.getOfflineSigner!(chainId!)
        : window.leap.getOfflineSigner!(chainId!);

    const signingClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner!,
      { gasPrice: GasPrice.fromString("0.025uatom") },
    );

    const fee = "auto";
    const memo = "";
    const messages = [
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

    return await signAndBroadcastTransaction({
      signingClient,
      offlineSigner,
      chainId,
      restUrl,
      userAddress,
      messages,
      fee,
      memo,
      denom,
    });
  };

  const voteProposal = async (proposalId: string, option: VoteOption) => {
    const offlineSigner =
      wallet && wallet === "keplr"
        ? window.getOfflineSigner!(chainId!)
        : window.leap.getOfflineSigner!(chainId!);

    const signingClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner!,
      { gasPrice: GasPrice.fromString("0.050uatom") },
    );

    const fee = {
      gas: "500000",
      amount: [],
    };
    const memo = "";
    const messages = [
      {
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: {
          voter: userAddress!,
          proposalId: proposalId,
          option: option,
        },
      },
    ];

    return await signAndBroadcastTransaction({
      signingClient,
      offlineSigner,
      chainId,
      restUrl,
      userAddress,
      messages,
      fee,
      memo,
      denom,
    });
  };

  return {
    getStakeBalance,
    getAvailableBalance,
    withdrawStakedReward,
    delegateToken,
    undelegateToken,
    redelegateToken,
    voteProposal,
  };
};
