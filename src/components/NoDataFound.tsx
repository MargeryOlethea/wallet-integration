import { MdOutlineError } from "react-icons/md";
import { Card, CardDescription, CardHeader } from "./ui/card";

function NoDataFound() {
  return (
    <>
      <Card className="my-5">
        <CardHeader className="text-slate-400">
          <MdOutlineError size="50" className="mx-auto my-2" />
          <CardDescription className="text-center">
            No Data Found
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}

export default NoDataFound;
