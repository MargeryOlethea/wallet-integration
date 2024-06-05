import {
  Coin,
  GasPrice,
  SigningStargateClient,
  StargateClient,
} from "@cosmjs/stargate";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "./useWallet";
import { OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types";
import { signEvmWithKeplrEdited } from "@/utils/signEvmWithKeplrEdited";

export enum VoteOption {
  VOTE_OPTION_YES = 1,
  VOTE_OPTION_ABSTAIN = 2,
  VOTE_OPTION_NO = 3,
  VOTE_OPTION_NO_WITH_VETO = 4,
}

export const useCosmjs = () => {
  const { chainId, userAddress, wallet } = useWallet();
  const rpcUrl = (chainId && chainInfoMap[chainId].rpc) || "";
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

    const result = await signingClient.withdrawRewards(
      userAddress!,
      validatorAddress,
      fee,
      memo,
    );

    return result;
  };

  // const delegateToken = async (validatorAddress: string, amount: string) => {
  //   const offlineSigner =
  //     wallet && wallet === "keplr"
  //       ? window.getOfflineSigner!(chainId!)
  //       : window.leap.getOfflineSigner!(chainId!);

  //   const signingClient = await SigningStargateClient.connectWithSigner(
  //     rpcUrl,
  //     offlineSigner!,
  //     { gasPrice: GasPrice.fromString("0.025uatom") },
  //   );

  //   const fee = "auto";
  //   const memo = "";

  //   const result = await signingClient.delegateTokens(
  //     userAddress!,
  //     validatorAddress,
  //     { amount: amount, denom: denom! },
  //     fee,
  //     memo,
  //   );

  //   // const message = [
  //   //   {
  //   //     typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
  //   //     value: {
  //   //       delegatorAddress: userAddress!,
  //   //       validatorAddress: validatorAddress,
  //   //       amount: { amount: amount, denom: denom! },
  //   //     },
  //   //   },
  //   // ];
  //   // const result = await signingClient.signAndBroadcast(
  //   //   userAddress!,
  //   //   message,
  //   //   fee,
  //   //   memo,
  //   // );

  //   return result;
  // };

  const delegateToken = async (validatorAddress: string, amount: string) => {
    let result;

    const offlineSigner =
      wallet && wallet === "keplr"
        ? window.getOfflineSigner!(chainId!)
        : window.leap.getOfflineSigner!(chainId!);

    const signingClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner,
      { gasPrice: GasPrice.fromString("0.025uatom") },
    );

    const fee = "auto";
    const memo = "";

    if (chainId === "froopyland_100-1") {
      // Handle Dymension chain using EVM signing
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

      result = await signEvmWithKeplrEdited({
        client: signingClient,
        signer: offlineSigner,
        chainId: chainId!,
        signerAddress: userAddress!,
        messages,
        fee: {
          amount: [{ denom: denom!, amount: "0" }],
          gas: "200000",
        },
        memo,
      });

      console.log(result, "ini resultnya");
    } else {
      // Handle other chains (osmosis, cosmos, etc.)
      result = await signingClient.delegateTokens(
        userAddress!,
        validatorAddress,
        { amount: amount, denom: denom! },
        fee,
        memo,
      );
    }

    return result;
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
