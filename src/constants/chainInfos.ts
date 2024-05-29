import { assets, chains } from "chain-registry/testnet";
import { ChainInfo } from "@keplr-wallet/types";

// COSMOS
export const cosmosHubTestnetChain = chains.find(
  (chain) => chain.chain_name === "cosmoshubtestnet",
) as ChainInfo | undefined;
export const cosmosHubTestnetAsset = assets.find(
  (chain) => chain.chain_name === "cosmoshubtestnet",
);

// OSMOSIS
export const osmosisTestnetChain = chains.find(
  (chain) => chain.chain_name === "osmosistestnet",
) as ChainInfo | undefined;

export const osmosisTestnetAsset = assets.find(
  (chain) => chain.chain_name === "osmosistestnet",
);

// DYMENSION
export const dymensionTestnetChain = "todo";
export const dymensionTestnetAsset = "todo";
