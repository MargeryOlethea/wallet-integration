import { ChainInfo } from "@keplr-wallet/types";

export const dymensionTestnetChainInfo: ChainInfo = {
  chainId: "froopyland-100-1",
  chainName: "Dymension Testnet",
  chainSymbolImageUrl:
    "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dymension_1100/chain.png",
  rpc: "https://froopyland-public.rpc.silknodes.io/",
  rest: "https://froopyland-public.api.silknodes.io/",
  evm: {
    chainId: 1100,
    rpc: "https://evm-dymension.keplr.app",
  },
  currencies: [
    {
      coinMinimalDenom: "adym",
      coinDenom: "DYM",
      coinDecimals: 18,
      coinGeckoId: "dymension",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dymension_1100/chain.png",
    },
  ],
  bip44: {
    coinType: 60,
  },
  bech32Config: {
    bech32PrefixAccAddr: "dym",
    bech32PrefixAccPub: "dympub",
    bech32PrefixValAddr: "dymvaloper",
    bech32PrefixValPub: "dymvaloperpub",
    bech32PrefixConsAddr: "dymvalcons",
    bech32PrefixConsPub: "dymvalconspub",
  },
  stakeCurrency: {
    coinMinimalDenom: "adym",
    coinDenom: "DYM",
    coinDecimals: 18,
    coinGeckoId: "dymension",
    coinImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dymension_1100/chain.png",
  },
  feeCurrencies: [
    {
      coinMinimalDenom: "adym",
      coinDenom: "DYM",
      coinDecimals: 18,
      coinGeckoId: "dymension",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/dymension_1100/chain.png",
      gasPriceStep: {
        average: 20000000000,
        high: 20000000000,
        low: 20000000000,
      },
    },
  ],
  walletUrlForStaking: "https://wallet.keplr.app/chains/dymension",
  features: ["eth-address-gen", "eth-key-sign"],
};
