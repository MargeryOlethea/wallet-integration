import { ChainInfo } from "@keplr-wallet/types";
import { cosmoshubTestnetChainInfo } from "./chainInfos/cosmoshubTestnetChainInfo";
import { dymensionTestnetChainInfo } from "./chainInfos/dymensionTestnetChainInfo";
import { osmosisTestnetChainInfo } from "./chainInfos/osmosisTestnetChainInfo";

interface ChainInfoMap {
  [key: string]: ChainInfo;
  "froopyland_100-1": ChainInfo;
  "theta-testnet-001": ChainInfo;
  "osmo-test-5": ChainInfo;
}

export const chainInfoMap: ChainInfoMap = {
  "theta-testnet-001": cosmoshubTestnetChainInfo,
  "osmo-test-5": osmosisTestnetChainInfo,
  "froopyland_100-1": dymensionTestnetChainInfo,
};
