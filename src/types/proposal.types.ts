export interface ProposalData {
  proposals: (PassedProposalItem | RejectedProposalItem)[];
  pagination: PaginationInfo;
}

export interface PassedProposalItem {
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

export interface RejectedProposalItem {
  id: string;
  title: string;
  summary: string;
  final_tally_result: TallyResult;
  voting_end_time: string;
  messages: ProposalMessage[];
  metadata: string;
}

export interface ProposalMessage {
  "@type": string;
  content: MessageContent;
  authority: string;
}

export interface MessageContent {
  "@type": string;
  title: string;
  description: string;
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
