"use client";
import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import { useWallet } from "@/hooks/useWallet";
import { useState } from "react";
import { ProposalStatus } from "@/helpers/stringModifiers";
import toast from "react-hot-toast";
import BottomPagination from "@/components/BottomPagination";
import StatusTab from "./_components/StatusTab";
import LoadingProposalTable from "./_components/loading/LoadingProposalTable";
import NoDataFound from "@/components/NoDataFound";
import ProposalListTable from "./_components/ProposalListTable";
import { useProposalsList } from "@/hooks/useReactQuery";

function Proposals() {
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

  // fetch data
  const { data, error, isLoading } = useProposalsList(
    paginationOffset,
    paginationLimit,
    proposalStatus,
  );

  const proposals = data && data.proposals;

  if (error) {
    toast.error(error.message);
  }

  const { showConnectToWallet } = useWallet();
  if (showConnectToWallet) {
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
