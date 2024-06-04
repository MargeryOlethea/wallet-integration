import { ProposalItem } from "@/types/proposal.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dayDifferenceCounter, timeFormatter } from "@/helpers/dateModifiers";
import LoadingProposalTimelineCard from "./loading/LoadingProposalTimelineCard";

interface ProposalTimelineCardProps {
  proposal: ProposalItem | undefined;
  loading: boolean;
}

function ProposalTimelineCard({
  proposal,
  loading,
}: ProposalTimelineCardProps) {
  if (loading) return <LoadingProposalTimelineCard />;

  if (!loading && proposal) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* submit time */}
              <div>
                <p className="text-md font-medium text-slate-500">
                  Submit Time
                </p>
                <p className="font-semibold">
                  {timeFormatter(proposal.submit_time)}{" "}
                  <span className="font-normal text-slate-500 text-sm">
                    ({dayDifferenceCounter(proposal.submit_time)})
                  </span>
                </p>
              </div>

              {/* voting start time */}
              <div>
                <p className="text-md font-medium text-slate-500">
                  Voting Start Time
                </p>
                <p className="font-semibold">
                  {timeFormatter(proposal.voting_start_time)}{" "}
                  <span className="font-normal text-slate-500 text-sm">
                    ({dayDifferenceCounter(proposal.voting_start_time)})
                  </span>
                </p>
              </div>

              {/* deposit end time */}
              <div>
                <p className="text-md font-medium text-slate-500">
                  Deposit End Time
                </p>
                <p className="font-semibold">
                  {timeFormatter(proposal.deposit_end_time)}{" "}
                  <span className="font-normal text-slate-500 text-sm">
                    ({dayDifferenceCounter(proposal.deposit_end_time)})
                  </span>
                </p>
              </div>

              {/* voting end time */}
              <div>
                <p className="text-md font-medium text-slate-500">
                  Voting End Time
                </p>
                <p className="font-semibold">
                  {timeFormatter(proposal.voting_end_time)}{" "}
                  <span className="font-normal text-slate-500 text-sm">
                    ({dayDifferenceCounter(proposal.voting_end_time)})
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default ProposalTimelineCard;
