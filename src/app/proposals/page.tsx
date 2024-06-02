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
import { MdOutlineError } from "react-icons/md";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useGovernanceApi } from "@/hooks/useGovernanceApi";
import { useState } from "react";
import { ProposalStatus } from "@/helpers/stringModifiers";
import ProposalTableRows from "@/components/proposalsPage/ProposalTableRows";
import toast from "react-hot-toast";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import BottomPagination from "@/components/BottomPagination";

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

  // handle status
  const handleStatus = (status: ProposalStatus) => {
    setPaginationOffset(0);
    setProposalStatus(status);
  };

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
        </div>

        {proposals && proposals.length < 1 ? (
          <Card className="my-5">
            <CardHeader className="text-slate-400">
              <MdOutlineError size="50" className="mx-auto my-2" />
              <CardDescription className="text-center">
                No Data Found
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <>
            <Card className="my-5">
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
                      key={proposal.id}
                      proposal={proposal}
                      proposalStatus={proposalStatus}
                    />
                  ))}
                </TableBody>
              </Table>
            </Card>

            <BottomPagination
              paginationOffset={paginationOffset}
              setPaginationOffset={setPaginationOffset}
              data={proposals}
              paginationLimit={paginationLimit}
            />
          </>
        )}
      </>
    );
  }
}

export default Proposals;
