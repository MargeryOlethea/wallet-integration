import { ChainData } from "@/types/chain.types";

export const chainDatas: ChainData[] = [
  {
    name: "Cosmoshub Testnet",
    data: {
      rpcUrl: "https://rpc.sentry-01.theta-testnet.polypore.xyz",
      chain_id: "theta-testnet-001",
    },
  },
  {
    name: "Osmosis Testnet",
    data: {
      rpcUrl: "https://rpc.osmotest5.osmosis.zone/",
      chain_id: "osmo-test-5",
    },
  },
  {
    name: "Dymension Testnet",
    data: {
      rpcUrl: "https://froopyland-public.rpc.silknodes.io/",
      chain_id: "blumbus_111-1",
    },
  },
];
