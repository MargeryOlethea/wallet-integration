import { Window as KeplrWindow } from "@keplr-wallet/types";
import { Button } from "../ui/button";
import { FaSignOutAlt } from "react-icons/fa";
import { useWallet } from "@/hooks/useWallet";
import { IoCopy } from "react-icons/io5";
import { truncateString } from "@/helpers/stringModifiers";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { useModal } from "@/hooks/useModal";

declare global {
  interface Window extends KeplrWindow {
    //TODO : leap type correction
    leap: any;
  }
}

function WalletModal() {
  const { isWalletModalOpen, setWalletModalOpen } = useModal();

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      setWalletModalOpen(false);
    }
  };

  // disconnect wallet
  const { setWallet, setUserAddress, userAddress } = useWallet();
  const disconnectWallet = () => {
    setWallet(null);
    setUserAddress(null);
    localStorage.removeItem("wallet");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("chainId");
    window.location.reload();
  };

  if (!isWalletModalOpen) {
    return null;
  }

  return (
    <>
      <div className="z-100 bg-white absolute shadow-lg border-slate-100 border my-2 rounded-xl flex-col flex-1 gap-5 p-5 justify-end right-0">
        {userAddress && (
          <div className="flex items-center gap-2 mb-2">
            <p>{truncateString(userAddress, 12, 10)}</p>
            <button
              onClick={() => {
                copyToClipboard(userAddress!);
              }}
            >
              <IoCopy />
            </button>
          </div>
        )}

        <Button
          onClick={disconnectWallet}
          variant="secondary"
          className="gap-2"
        >
          <FaSignOutAlt /> Disconnect
        </Button>
      </div>
    </>
  );
}

export default WalletModal;
