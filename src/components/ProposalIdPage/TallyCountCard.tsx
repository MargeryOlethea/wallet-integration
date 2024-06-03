import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
interface TallyCountCardProps {
  tallyCount: {
    yes: string;
    no: string;
    no_with_veto: string;
    abstain: string;
  };
}

function TallyCountCard({ tallyCount }: TallyCountCardProps) {
  // Counting votes
  const yesVote = Number(tallyCount.yes);
  const noVote = Number(tallyCount.no);
  const vetoVote = Number(tallyCount.no_with_veto);
  const abstainVote = Number(tallyCount.abstain);

  const totalVotes = yesVote + noVote + vetoVote + abstainVote;
  const yesPercentage = (Number(yesVote) / Number(totalVotes)) * 100;
  return (
    <>
      <Card className="my-5">
        <CardHeader>
          <CardTitle className="flex justify-between">Tally</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-8">
            <Button
              className="flex-col flex h-full justify-center"
              variant="secondary"
            >
              <p className="text-md font-medium text-blue-500">Yes</p>
              <p className="text-2xl">50%</p>
            </Button>

            <Button
              className="flex-col flex h-full justify-center"
              variant="secondary"
            >
              <p className="text-md font-medium text-red-500">No</p>
              <p className="text-2xl">20%</p>
            </Button>

            <Button
              className="flex-col flex h-full justify-center"
              variant="secondary"
            >
              <p className="text-md font-medium">Abstain</p>
              <p className="text-2xl">20%</p>
            </Button>

            <Button
              className="flex-col flex h-full justify-center"
              variant="secondary"
            >
              <p className="text-md font-medium">No With Vote</p>
              <p className="text-2xl">10%</p>
            </Button>
          </div>

          <div className="mt-8">
            <p className="font-bold">Progress ({yesPercentage}%)</p>
          </div>
          <Progress className="w-full my-3" value={yesPercentage} />
        </CardContent>
      </Card>
    </>
  );
}

export default TallyCountCard;
