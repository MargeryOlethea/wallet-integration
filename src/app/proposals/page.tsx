"use client";
import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import { useWallet } from "@/hooks/useWallet";
import { useQuery } from "@tanstack/react-query";
import { useGovernanceApi } from "@/hooks/useGovernanceApi";
import { useState } from "react";
import { ProposalStatus } from "@/helpers/stringModifiers";
import toast from "react-hot-toast";
import BottomPagination from "@/components/BottomPagination";
import StatusTab from "@/components/proposalsPage/StatusTab";
import NoDataFound from "@/components/NoDataFound";
import ProposalListTable from "@/components/proposalsPage/ProposalListTable";
import LoadingProposalTable from "@/components/proposalsPage/loading/LoadingProposalTable";

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

  if (!wallet || !userAddress) {
    return <NoConnectedWalletHeader />;
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <h1 className="text-xl">Proposals</h1>

        <StatusTab
          handleStatus={handleStatus}
          proposalStatus={proposalStatus}
        />
      </div>

      {isLoading && <LoadingProposalTable rows={paginationLimit} />}

      {(!proposals || proposals?.length < 1) && <NoDataFound />}

      {proposals && proposals.length > 0 && !isLoading && (
        <ProposalListTable
          proposals={proposals}
          proposalStatus={proposalStatus}
        />
      )}
      <>
        <BottomPagination
          paginationOffset={paginationOffset}
          setPaginationOffset={setPaginationOffset}
          data={proposals}
          paginationLimit={paginationLimit}
        />
      </>
    </>
  );
}

export default Proposals;
