import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function ProposalPage() {
  return (
    <>
      <Card className="my-10">
        <CardHeader>
          <CardTitle className="flex justify-between">
            1. This is a proposal<Badge>Voting Period</Badge>
          </CardTitle>
          <CardDescription>Ends in 2 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et enim,
            dolor sed asperiores atque consectetur saepe consequuntur fugiat a
            veritatis sit molestias possimus nobis natus sunt aut, suscipit
            facere nisi. Temporibus ex nobis debitis perspiciatis libero
            dolorum! Eos, quibusdam dicta unde laudantium impedit doloribus
            voluptatum perspiciatis possimus! Magnam quas pariatur minus,
            obcaecati atque in, earum corporis eligendi ullam enim ex!
          </p>
        </CardContent>
      </Card>

      <Card className="my-10">
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
            <p className="font-bold">Progress (50%)</p>
          </div>
          <Progress className="w-full my-3" value={50} />
        </CardContent>
      </Card>
    </>
  );
}

export default ProposalPage;
