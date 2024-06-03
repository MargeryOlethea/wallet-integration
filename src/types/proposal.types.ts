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

export interface PaginationInfo {
  next_key: string | null;
  total: string;
}

export interface ProposalById {
  proposal: ProposalItem;
}
