import { SigningStargateClient } from "@cosmjs/stargate";
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import { makeAuthInfoBytes, makeSignDoc } from "@cosmjs/proto-signing";
import { Int53 } from "@cosmjs/math";
import { Any } from "cosmjs-types/google/protobuf/any";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import {
  AuthInfo,
  Fee,
  Tx,
  TxBody,
  TxRaw,
} from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { OfflineDirectSigner } from "@cosmjs/proto-signing/build/signer";
import { StdFee } from "@cosmjs/amino";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { SimulateRequest } from "cosmjs-types/cosmos/tx/v1beta1/service";
import { EncodeObject } from "@cosmjs/proto-signing/build/registry";
import { Chain } from "@chain-registry/types";

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
  chain: Chain;
  signerAddress: string;
  messages: EncodeObject[];
  fee: StdFee;
  memo: string;
}

interface ISimulateProps {
  client: SigningStargateClient;
  signer: OfflineDirectSigner;
  chain: Chain;
  signerAddress: string;
  messages: EncodeObject[];
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
  chain,
  signerAddress,
  messages,
  fee,
  memo,
}: ISignProps) {
  // Query account info, because cosmjs doesn't support Evmos account
  const accountRes = await fetch(
    `https://rest.cosmos.directory/${chain.chain_name}/cosmos/auth/v1beta1/accounts/${signerAddress}`,
  );
  isDev && console.log("signEvmWithKeplr accountRes", accountRes);
  if (!accountRes.ok) {
    throw new Error(
      "Failed to retrieve account from signer: " +
        (accountRes.statusText || accountRes.status),
    );
  }
  const accountResJson: IAccount | IEthAccount = await accountRes.json();
  isDev && console.log("signEvmWithKeplr account", accountResJson.account);
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
    console.log("signEvmWithKeplr txBodyEncodeObject", txBodyEncodeObject);

  isDev && console.log("signEvmWithKeplr fee", fee);

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
    chain.chain_id,
    accountNumber,
  );

  isDev && console.log("signEvmWithKeplr signDoc", signDoc);

  const { signature, signed } = await signer.signDirect(signerAddress, signDoc);

  // returns txBytes for broadcast
  return TxRaw.encode({
    bodyBytes: signed.bodyBytes,
    authInfoBytes: signed.authInfoBytes,
    signatures: [fromBase64(signature.signature)],
  }).finish();
}

export async function simulateEvmWithKeplr({
  client, // SigningStargateClient
  signer, // keplr OfflineSigner
  chain,
  signerAddress,
  messages,
  memo,
}: ISimulateProps): Promise<string> {
  // Query account info, because cosmjs doesn't support Evmos account
  const accountRes = await fetch(
    `https://rest.cosmos.directory/${chain.chain_name}/cosmos/auth/v1beta1/accounts/${signerAddress}`,
  );
  // {
  //   "account": {
  //     "@type": "/cosmos.auth.v1beta1.BaseAccount",
  //     "address": "dym..",
  //     "pub_key": {
  //       "@type": "/ethermint.crypto.v1.ethsecp256k1.PubKey",
  //       "key": "asdf"
  //     },
  //     "account_number": "345797",
  //     "sequence": "3"
  //   }
  // }

  isDev && console.log("signEvmWithKeplr accountRes", accountRes);
  if (!accountRes.ok) {
    throw new Error(
      "Failed to retrieve account from signer: " +
        (accountRes.statusText || accountRes.status),
    );
  }
  const accountResJson: IAccount | IEthAccount = await accountRes.json();
  isDev && console.log("signEvmWithKeplr account", accountResJson.account);
  const sequence = BigInt(
    "base_account" in accountResJson.account
      ? accountResJson.account.base_account.sequence
      : accountResJson.account.sequence,
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
      messages: messages,
      memo: memo,
    },
  };

  isDev &&
    console.log("signEvmWithKeplr txBodyEncodeObject", txBodyEncodeObject);

  const anyMsgs = messages.map((m) => client.registry.encodeAsAny(m));

  isDev && console.log("signEvmWithKeplr anyMsgs", anyMsgs);

  const tx = Tx.fromPartial({
    authInfo: AuthInfo.fromPartial({
      fee: Fee.fromPartial({}),
      signerInfos: [
        {
          publicKey: pubk,
          sequence,
          modeInfo: { single: { mode: SignMode.SIGN_MODE_UNSPECIFIED } },
        },
      ],
    }),
    body: TxBody.fromPartial({
      messages: Array.from(anyMsgs),
      memo: memo,
    }),
    signatures: [new Uint8Array()],
  });
  const request = SimulateRequest.fromPartial({
    txBytes: Tx.encode(tx).finish(),
  });

  isDev &&
    console.log(
      "signEvmWithKeplr toBase64(request.txBytes)",
      toBase64(request.txBytes),
    );

  const res = await fetch(
    `https://rest.cosmos.directory/${chain.chain_name}/cosmos/tx/v1beta1/simulate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tx_bytes: toBase64(request.txBytes) }),
    },
  );

  if (!res.ok) {
    // TODO handle error json?
    console.error("Failed to simulate transaction:", res.statusText);
    throw new Error(
      "Failed to simulate transaction: " + (res.statusText || res.status),
    );
  }

  const data: {
    gas_info: {
      gas_used: string;
      gas_wanted: string;
    };
  } = await res.json();

  isDev && console.log("signEvmWithKeplr data", data);

  return data.gas_info.gas_used;
}
