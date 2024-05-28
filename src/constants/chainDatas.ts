interface chainData {
  name: string;
  rpcUrl: string;
}
export const chainDatas: chainData[] = [
  {
    name: "Cosmoshub Testnet",
    rpcUrl: "https://rpc.sentry-01.theta-testnet.polypore.xyz",
  },
  { name: "Osmosis Testnet", rpcUrl: "https://rpc.osmotest5.osmosis.zone/" },
  {
    name: "Dymension Testnet",
    rpcUrl: "https://froopyland-public.rpc.silknodes.io/",
  },
];
