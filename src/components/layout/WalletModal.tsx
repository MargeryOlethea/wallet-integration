import SelectNetwork from "./SelectNetwork";
import { Window as KeplrWindow } from "@keplr-wallet/types";

import Image from "next/image";
import { Button } from "../ui/button";
import { FaSignOutAlt } from "react-icons/fa";
import { useWallet } from "@/hooks/useWallet";

declare global {
  interface Window extends KeplrWindow {
    //TODO : leap type correction
    leap: any;
  }
}

function WalletModal() {
  const { wallet, setWallet, setUserAddress, connectToWallet } = useWallet();

  // disconnect wallet
  const disconnectWallet = () => {
    setWallet(null);
    setUserAddress(null);
    localStorage.removeItem("wallet");
    localStorage.removeItem("userAddress");
  };

  return (
    <>
      <div className="z-10 bg-white absolute shadow-lg border-slate-100 border my-2 rounded-xl flex-col flex-1 gap-5 p-5 justify-end right-0">
        {wallet === null ? (
          <>
            {/* select network */}
            <SelectNetwork />

            {/* select wallet */}
            <div className="flex mt-3 gap-3">
              <div
                className=" w-[7em] rounded-xl flex flex-col items-center justify-center group"
                onClick={() => {
                  connectToWallet("keplr");
                }}
              >
                <Image
                  src="/keplr_icon.png"
                  alt="Keplr"
                  width={100}
                  height={100}
                  className="group-hover:shadow-md rounded-3xl group-hover:scale-105"
                />
                <p className="text-xs text-center font-bold group-hover:text-primary-foreground/9 group-hover:scale-110">
                  Keplr
                </p>
              </div>

              <div
                className=" w-[7em] rounded-xl flex-col flex items-center justify-center group"
                onClick={() => {
                  connectToWallet("leap");
                }}
              >
                <Image
                  src="/leap_icon.png"
                  alt="Leap"
                  width={100}
                  height={100}
                  className="group-hover:shadow-md rounded-3xl group-hover:scale-105"
                />
                <p className="text-xs text-center font-bold group-hover:text-primary-foreground/9 group-hover:scale-110">
                  Leap
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <Button
              onClick={disconnectWallet}
              variant="secondary"
              className="gap-2"
            >
              <FaSignOutAlt /> Disconnect
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default WalletModal;
