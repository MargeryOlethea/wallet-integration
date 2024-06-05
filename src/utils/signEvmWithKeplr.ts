import { SigningStargateClient } from "@cosmjs/stargate";
import { fromBase64 } from "@cosmjs/encoding";
import { makeAuthInfoBytes, makeSignDoc } from "@cosmjs/proto-signing";
import { Int53 } from "@cosmjs/math";
import { Any } from "cosmjs-types/google/protobuf/any";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { OfflineDirectSigner } from "@cosmjs/proto-signing/build/signer";
import { StdFee } from "@cosmjs/amino";
import { EncodeObject } from "@cosmjs/proto-signing/build/registry";

export const evmChainIds = [
  "dymension_1100-1",
  "evmos_9001-2",
  "acre_9052-1",
  "canto_7700-1",
  "blockx_100-1",
];

interface ISignProps {
  client: SigningStargateClient;
  signer: OfflineDirectSigner;
  chainId: string;
  restUrl: string;
  signerAddress: string;
  messages: EncodeObject[];
  fee: StdFee;
  memo: string;
}

interface IAccount {
  account: {
    "@type": "/cosmos.auth.v1beta1.BaseAccount";
    address: string;
    pub_key: {
      "@type": string;
      key: string;
    };
    account_number: string;
    sequence: string;
  };
}

interface IEthAccount {
  account: {
    "@type": "/ethermint.types.v1.EthAccount";
    base_account: {
      address: string;
      pub_key: {
        "@type": string;
        key: string;
      };
      account_number: string;
      sequence: string;
    };
    code_hash: string;
  };
}

const isDev = true;

export async function signEvmWithKeplr({
  client, // SigningStargateClient
  signer, // keplr OfflineSigner
  chainId,
  restUrl,
  signerAddress,
  messages,
  fee,
  memo,
}: ISignProps) {
  try {
    // Query account info, because cosmjs doesn't support Evmos account

    const accountRes = await fetch(
      restUrl + "/cosmos/auth/v1beta1/accounts/" + signerAddress,
    );
    isDev && console.log("signDymWithKeplr accountRes", accountRes);
    if (!accountRes.ok) {
      throw new Error(
        "Failed to retrieve account from signer: " +
          (accountRes.statusText || accountRes.status),
      );
    }
    const accountResJson: IAccount | IEthAccount = await accountRes.json();
    isDev && console.log("signDymWithKeplr account", accountResJson.account);
    const sequence = BigInt(
      "base_account" in accountResJson.account
        ? accountResJson.account.base_account.sequence
        : accountResJson.account.sequence,
    );
    const accountNumber = Number(
      "base_account" in accountResJson.account
        ? accountResJson.account.base_account.account_number
        : accountResJson.account.account_number,
    );

    const accountFromSigner = (await signer.getAccounts()).find(
      (account) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkeyBytes = accountFromSigner.pubkey;

    // Custom typeUrl for EVMOS
    const pubk = Any.fromPartial({
      typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
      value: PubKey.encode({
        key: pubkeyBytes,
      }).finish(),
    });

    const txBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages,
        memo,
      },
    };

    isDev &&
      console.log("signDymWithKeplr txBodyEncodeObject", txBodyEncodeObject);

    isDev && console.log("signDymWithKeplr fee", fee);

    const txBodyBytes = client.registry.encode(txBodyEncodeObject);

    const gasLimit = Int53.fromString(fee.gas).toNumber();

    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey: pubk, sequence }],
      fee.amount,
      gasLimit,
      undefined,
      undefined,
    );
    const signDoc = makeSignDoc(
      txBodyBytes,
      authInfoBytes,
      chainId,
      accountNumber,
    );

    isDev && console.log("signDymWithKeplr signDoc", signDoc);

    const { signature, signed } = await signer.signDirect(
      signerAddress,
      signDoc,
    );

    // returns txBytes for broadcast
    return TxRaw.encode({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    }).finish();
  } catch (error) {
    console.log(error);
  }
}
