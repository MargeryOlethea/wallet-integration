import { Window as KeplrWindow } from "@keplr-wallet/types";
import { Button } from "../ui/button";
import { FaSignOutAlt } from "react-icons/fa";
import { useWallet } from "@/hooks/useWallet";
import { IoCopy } from "react-icons/io5";
import { truncateString } from "@/helpers/stringModifiers";
import { copyToClipboard } from "@/utils/copyToClipboard";

declare global {
  interface Window extends KeplrWindow {
    //TODO : leap type correction
    leap: any;
  }
}

function WalletModal() {
  const { setWallet, setUserAddress, userAddress } = useWallet();

  // disconnect wallet
  const disconnectWallet = () => {
    setWallet(null);
    setUserAddress(null);
    localStorage.removeItem("wallet");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("chainId");
    window.location.reload();
  };

  return (
    <>
      <div className="z-10 bg-white absolute shadow-lg border-slate-100 border my-2 rounded-xl flex-col flex-1 gap-5 p-5 justify-end right-0">
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
