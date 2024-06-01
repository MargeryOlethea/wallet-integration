"use client";
import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import { useWallet } from "@/hooks/useWallet";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useGovernanceApi } from "@/hooks/useGovernanceApi";
import { useState } from "react";
import { ProposalStatus } from "@/helpers/stringModifiers";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import ProposalTableRows from "@/components/proposalsPage/ProposalTableRows";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";

function Proposals() {
  const { wallet, userAddress } = useWallet();

  // get proposals list
  const { getProposalsList } = useGovernanceApi();

  // conditions
  const paginationLimit = 10;
  const [paginationOffset, setPaginationOffset] = useState(0);
  const [proposalStatus, setProposalStatus] = useState<ProposalStatus>(
    ProposalStatus.VOTING_PERIOD,
  );

  // fetch
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "proposalsList",
      proposalStatus,
      paginationOffset,
      paginationLimit,
    ],
    queryFn: () =>
      getProposalsList(proposalStatus, paginationOffset, paginationLimit),
  });

  const proposals = data && data.proposals;

  if (error) {
    toast.error(error.message);
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!wallet || !userAddress) {
    return <NoConnectedWalletHeader />;
  } else {
    return (
      <>
        <div className="flex justify-between w-full">
          <h1 className="text-xl">Proposals</h1>

          <Tabs value={proposalStatus}>
            <TabsList>
              <TabsTrigger
                value={ProposalStatus.VOTING_PERIOD}
                onClick={() => setProposalStatus(ProposalStatus.VOTING_PERIOD)}
              >
                Voting
              </TabsTrigger>
              <TabsTrigger
                value={ProposalStatus.PASSED}
                onClick={() => setProposalStatus(ProposalStatus.PASSED)}
              >
                Passed
              </TabsTrigger>
              <TabsTrigger
                value={ProposalStatus.REJECTED}
                onClick={() => setProposalStatus(ProposalStatus.REJECTED)}
              >
                Rejected
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {proposals && proposals.length < 1 ? (
          <Card className="my-5">
            <p className="font-semibold text-center my-5">No Data Found</p>
          </Card>
        ) : (
          <Table className="my-2">
            <TableHeader>
              <TableRow>
                <TableHead>#ID</TableHead>
                <TableHead>Proposal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>End Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals?.map((proposal) => (
                <ProposalTableRows
                  key={proposal.proposal_id}
                  proposal={proposal}
                  proposalStatus={proposalStatus}
                />
              ))}
            </TableBody>
          </Table>
        )}

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
                disabled={proposals && proposals?.length < paginationLimit}
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
}

export default Proposals;
