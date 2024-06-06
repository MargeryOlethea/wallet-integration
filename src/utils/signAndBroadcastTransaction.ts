import { signEvmWithKeplr } from "./signEvmWithKeplr";

export const signAndBroadcastTransaction = async ({
  signingClient,
  offlineSigner,
  chainId,
  restUrl,
  userAddress,
  messages,
  fee,
  memo,
  denom,
}: any) => {
  let result;

  // dymension testnet chain handling
  if (chainId === "froopyland_100-1") {
    const txBytes = await signEvmWithKeplr({
      client: signingClient,
      signer: offlineSigner,
      chainId: chainId!,
      restUrl: restUrl!,
      signerAddress: userAddress!,
      messages,
      fee: {
        amount: [{ denom: denom!, amount: "0" }],
        gas: "200000",
      },
      memo,
    });

    result = await signingClient.broadcastTx(txBytes!);
  } else {
    // osmosis testnet & cosmos testnet chain handling
    result = await signingClient.signAndBroadcast(
      userAddress!,
      messages,
      fee,
      memo,
    );
  }

  return result;
};
