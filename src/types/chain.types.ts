export interface ChainData {
  name: string;
  data: ChainDetail;
}

export interface ChainDetail {
  rpcUrl: string;
  chain_id: string;
}
