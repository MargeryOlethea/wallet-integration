import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TallyResult } from "@/types/proposal.types";
import LoadingTallyCountCard from "./loading/LoadingTallyCountCard";
import { useVoteProposal } from "@/hooks/useReactMutation";
import { VoteOption } from "@/hooks/useCosmjs";
interface TallyCountCardProps {
  proposalId: string | undefined;
  tallyCount: TallyResult | undefined;
  status: string | undefined;
  loading: boolean;
}

function TallyCountCard({
  proposalId,
  tallyCount,
  status,
  loading,
}: TallyCountCardProps) {
  // Counting votes
  const yesVote = Number(tallyCount?.yes_count) || 0;
  const noVote = Number(tallyCount?.no_count) || 0;
  const vetoVote = Number(tallyCount?.no_with_veto_count) || 0;
  const abstainVote = Number(tallyCount?.abstain_count) || 0;

  const totalVotes = yesVote + noVote + vetoVote + abstainVote;
  const yesPercentage = (yesVote / totalVotes || 0) * 100;
  const noPercentage = (noVote / totalVotes || 0) * 100;
  const vetoPercentage = (vetoVote / totalVotes || 0) * 100;
  const abstainPercentage = (abstainVote / totalVotes || 0) * 100;

  // handle voting
  const votingMutation = useVoteProposal();

  if (loading) {
    return <LoadingTallyCountCard />;
  }

  if (!loading && tallyCount) {
    return (
      <>
        <Card className="my-5">
          <CardHeader>
            <CardTitle>Tally</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-8">
              {/* yes */}
              <Button
                onClick={() =>
                  votingMutation.mutate(VoteOption.VOTE_OPTION_YES)
                }
                className="flex-col flex h-full justify-center"
                variant="secondary"
                disabled={
                  status === "PROPOSAL_STATUS_PASSED" ||
                  status === "PROPOSAL_STATUS_REJECTED" ||
                  votingMutation.isPending
                }
              >
                <p className="text-md font-medium text-blue-500">
                  {" "}
                  {votingMutation.isPending ? "Processing..." : "Yes"}
                </p>
                <p className="text-2xl">{yesPercentage}%</p>
              </Button>

              {/* no */}
              <Button
                onClick={() => votingMutation.mutate(VoteOption.VOTE_OPTION_NO)}
                className="flex-col flex h-full justify-center"
                variant="secondary"
                disabled={
                  status === "PROPOSAL_STATUS_PASSED" ||
                  status === "PROPOSAL_STATUS_REJECTED" ||
                  votingMutation.isPending
                }
              >
                <p className="text-md font-medium text-red-800">
                  {" "}
                  {votingMutation.isPending ? "Processing..." : "No"}
                </p>
                <p className="text-2xl">{noPercentage}%</p>
              </Button>

              {/* abstain */}
              <Button
                onClick={() =>
                  votingMutation.mutate(VoteOption.VOTE_OPTION_ABSTAIN)
                }
                className="flex-col flex h-full justify-center"
                variant="secondary"
                disabled={
                  status === "PROPOSAL_STATUS_PASSED" ||
                  status === "PROPOSAL_STATUS_REJECTED" ||
                  votingMutation.isPending
                }
              >
                <p className="text-md font-medium">
                  {" "}
                  {votingMutation.isPending ? "Processing..." : "Abstain"}
                </p>
                <p className="text-2xl">{abstainPercentage}%</p>
              </Button>

              {/* no with veto */}
              <Button
                onClick={() =>
                  votingMutation.mutate(VoteOption.VOTE_OPTION_NO_WITH_VETO)
                }
                className="flex-col flex h-full justify-center"
                variant="secondary"
                disabled={
                  status === "PROPOSAL_STATUS_PASSED" ||
                  status === "PROPOSAL_STATUS_REJECTED" ||
                  votingMutation.isPending
                }
              >
                <p className="text-md font-medium text-red-500">
                  {votingMutation.isPending ? "Processing..." : "No With Veto"}
                </p>
                <p className="text-2xl">{vetoPercentage}%</p>
              </Button>
            </div>

            {/* Percentage */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 my-5">
              {/* yes */}
              <div>
                <p className="text-md font-medium text-slate-500">Yes</p>
                <Progress className="w-full my-3" value={yesPercentage} />
              </div>

              {/* no */}
              <div>
                <p className="text-md font-medium text-slate-500">No</p>
                <Progress className="w-full my-3" value={noPercentage} />
              </div>

              {/* abstain */}
              <div>
                <p className="text-md font-medium text-slate-500">Abstain</p>
                <Progress className="w-full my-3" value={abstainPercentage} />
              </div>

              {/* veto */}
              <div>
                <p className="text-md font-medium text-slate-500">
                  No with Veto
                </p>
                <Progress className="w-full my-3" value={vetoPercentage} />
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default TallyCountCard;
