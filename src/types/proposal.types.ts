export interface ProposalData {
  proposals: ProposalItem[];
  pagination: PaginationInfo;
}

export interface ProposalItem {
  id: string;
  title: string;
  summary: string;
  status: string;
  final_tally_result: TallyResult;
  voting_end_time: string;
  voting_start_time: string;
  submit_time: string;
  deposit_end_time: string;
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
  yes_count: string;
  abstain_count: string;
  no_count: string;
  no_with_veto_count: string;
}

export interface PaginationInfo {
  next_key: string | null;
  total: string;
}

export interface ProposalById {
  proposal: ProposalItem;
}
