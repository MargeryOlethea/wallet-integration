export interface DelegationData {
  delegation_responses: DelegationResponse[];
  pagination: Pagination;
}

export interface Delegation {
  delegator_address: string;
  validator_address: string;
  shares: string;
}

export interface Balance {
  denom: string;
  amount: string;
}

export interface DelegationResponse {
  delegation: Delegation;
  balance: Balance;
}

export interface Pagination {
  next_key: string | null;
  total: string;
}
