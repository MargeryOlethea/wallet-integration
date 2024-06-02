import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface BottomPaginationProps {
  paginationOffset: number;
  setPaginationOffset: React.Dispatch<React.SetStateAction<number>>;
  paginationLimit: number;
  data: any;
}
function BottomPagination({
  paginationOffset,
  setPaginationOffset,
  paginationLimit,
  data,
}: BottomPaginationProps) {
  return (
    <>
      <Pagination>
        <PaginationContent className="gap-10">
          <PaginationItem>
            <Button
              variant="secondary"
              disabled={paginationOffset < 1}
              onClick={() =>
                setPaginationOffset((prev) => prev - paginationLimit)
              }
            >
              Previous
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              variant="secondary"
              disabled={data && data?.length < paginationLimit}
              onClick={() =>
                setPaginationOffset((prev) => prev + paginationLimit)
              }
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default BottomPagination;
