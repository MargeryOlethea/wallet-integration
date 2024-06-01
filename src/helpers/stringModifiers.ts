export function truncateString(
  str: string,
  maxChars: number = 75,
  cutLength: number = 5,
): string {
  if (str.length <= maxChars) {
    return str;
  }

  const ellipsis = "...";

  const frontPart = str.slice(0, cutLength);
  const endPart = str.slice(-cutLength);

  return `${frontPart}${ellipsis}${endPart}`;
}

export enum ProposalStatus {
  REJECTED = "PROPOSAL_STATUS_REJECTED",
  PASSED = "PROPOSAL_STATUS_PASSED",
  VOTING_PERIOD = "PROPOSAL_STATUS_VOTING_PERIOD",
}

export function getProposalStatusLabel(status: ProposalStatus): string {
  switch (status) {
    case ProposalStatus.REJECTED:
      return "Rejected";
    case ProposalStatus.PASSED:
      return "Passed";
    case ProposalStatus.VOTING_PERIOD:
      return "Voting Period";
    default:
      return "Unknown Status";
  }
}
