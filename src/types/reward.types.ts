export interface RewardsData {
  rewards: ValidatorReward[];
  total: TotalReward[];
}

export interface Reward {
  denom: string;
  amount: string;
}

export interface ValidatorReward {
  validator_address: string;
  reward: Reward[];
}

export interface TotalReward {
  denom: string;
  amount: string;
}
