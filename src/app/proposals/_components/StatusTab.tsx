import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProposalStatus } from "@/helpers/stringModifiers";

interface StatusTabProps {
  handleStatus: (status: ProposalStatus) => void;
  proposalStatus: ProposalStatus;
}

function StatusTab({ handleStatus, proposalStatus }: StatusTabProps) {
  return (
    <>
      <Tabs value={proposalStatus}>
        <TabsList>
          <TabsTrigger
            value={ProposalStatus.VOTING_PERIOD}
            onClick={() => handleStatus(ProposalStatus.VOTING_PERIOD)}
          >
            Voting
          </TabsTrigger>
          <TabsTrigger
            value={ProposalStatus.PASSED}
            onClick={() => handleStatus(ProposalStatus.PASSED)}
          >
            Passed
          </TabsTrigger>
          <TabsTrigger
            value={ProposalStatus.REJECTED}
            onClick={() => handleStatus(ProposalStatus.REJECTED)}
          >
            Rejected
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}

export default StatusTab;
