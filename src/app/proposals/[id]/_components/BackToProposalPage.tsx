import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";

function BackToProposalPage() {
  return (
    <>
      <Link href="/proposals">
        <Button className="mb-5 gap-2" variant="secondary">
          <IoChevronBack size="20" />
          <span>Back</span>
        </Button>
      </Link>
    </>
  );
}

export default BackToProposalPage;
