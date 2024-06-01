export interface ProposalData {
  proposals: ProposalItem[];
  pagination: PaginationInfo;
}

export interface ProposalItem {
  proposal_id: string;
  content: ProposalContent;
  status: string;
  final_tally_result: TallyResult;
  submit_time: string;
  deposit_end_time: string;
  total_deposit: Deposit[];
  voting_start_time: string;
  voting_end_time: string;
}

export interface ProposalContent {
  "@type": string;
  title: string;
  description: string;
}

export interface TallyResult {
  yes: string;
  abstain: string;
  no: string;
  no_with_veto: string;
}

export interface Deposit {
  denom: string;
  amount: string;
}

export interface PaginationInfo {
  next_key: string | null;
  total: string;
}
