import { useState } from "react";
import SelectNetwork from "./SelectNetwork";
import { chainDatas } from "@/constants/chainDatas";
import { Window as KeplrWindow } from "@keplr-wallet/types";

import Image from "next/image";
import toast from "react-hot-toast";

declare global {
  interface Window extends KeplrWindow {
    leap: any;
  }
}

function WalletModal({}: {}) {
  // select network
  const cosmoshubTestnetData = {
    rpcUrl: "https://rpc.sentry-01.theta-testnet.polypore.xyz",
    chain_id: "theta-testnet-001",
  };

  const [network, setNetwork] = useState(cosmoshubTestnetData);

  // connecting to keplr
  async function connectToKeplr() {
    try {
      const { keplr } = window;
      if (!keplr) {
        toast.error("You need to install or unlock Keplr");
      } else {
        await window.keplr!.enable(network.chain_id);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }

  // connecting to leap
  async function connectToLeap() {
    try {
      const { leap } = window;
      if (!leap) {
        toast.error("You need to install or unlock Keplr");
      } else {
        await window.leap!.enable(network.chain_id);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }

  return (
    <>
      <div className="z-10 absolute shadow-lg border-slate-100 border my-2 rounded-xl flex-col flex-1 gap-5 p-5 justify-end right-0">
        {/* select network */}
        <SelectNetwork network={network} setNetwork={setNetwork} />

        {/* select wallet */}
        <div className="flex mt-3 gap-3">
          <div
            className=" w-[7em] rounded-xl flex flex-col items-center justify-center group"
            onClick={connectToKeplr}
          >
            <Image
              src="/keplr_icon.png"
              alt="Keplr"
              width={100}
              height={80}
              className="group-hover:shadow-md rounded-3xl group-hover:scale-105"
            />
            <p className="text-xs text-center font-bold group-hover:text-primary-foreground/9 group-hover:scale-110">
              Keplr
            </p>
          </div>

          <div
            className=" w-[7em] rounded-xl flex-col flex items-center justify-center group"
            onClick={connectToLeap}
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
      </div>
    </>
  );
}

export default WalletModal;
