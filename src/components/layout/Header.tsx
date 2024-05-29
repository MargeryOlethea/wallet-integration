"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { IoWallet } from "react-icons/io5";
import { usePathname } from "next/navigation";
import WalletModal from "./WalletModal";
import { useEffect, useState } from "react";
import Image from "next/image";
import { truncateString } from "@/helpers/stringModifiers";
import { useWallet } from "@/hooks/useWallet";

function Header() {
  // navigations
  const navigations = [
    { name: "Staking", href: "/staking" },
    { name: "Governance", href: "/governance" },
  ];

  const pathname = usePathname();

  // modal
  const [isWalletOpen, setWalletOpen] = useState(false);

  // wallet info
  const { wallet, userAddress, setWallet, setUserAddress, network } =
    useWallet();

  // checking if the wallet has connected
  useEffect(() => {
    const savedWallet = localStorage.getItem("wallet");
    const savedUserAddress = localStorage.getItem("userAddress");

    if (savedWallet && savedUserAddress) {
      setWallet(savedWallet);
      setUserAddress(savedUserAddress);
    }
  }, [setWallet, setUserAddress]);

  return (
    <>
      <nav className="flex justify-between items-center">
        {/* logo */}
        <Link href="/" className="hover:text-primary/90">
          <h1 className="text-2xl">Wallet App</h1>
        </Link>

        {/* navigation */}
        <div className="flex gap-8">
          {navigations.map((navigation, idx) => (
            <Link
              key={idx}
              href={navigation.href}
              className="hover:font-semibold hover:text-primary/90"
            >
              <p
                className={`${pathname === navigation.href && "font-semibold"}`}
              >
                {navigation.name}
              </p>
            </Link>
          ))}
        </div>

        {/* wallet connect */}
        <div className="relative">
          {wallet && userAddress ? (
            <Button
              className="flex gap-2"
              onClick={() => setWalletOpen(!isWalletOpen)}
            >
              {wallet == "keplr" ? (
                <Image
                  src="/keplr_icon.png"
                  alt="keplr icon"
                  height={20}
                  width={20}
                />
              ) : (
                <Image
                  src="/leap_icon.png"
                  alt="leap icon"
                  height={20}
                  width={20}
                  className="rounded-sm"
                />
              )}
              {truncateString(userAddress!, 6, 5)}
            </Button>
          ) : (
            <Button
              className="flex gap-2"
              onClick={() => setWalletOpen(!isWalletOpen)}
            >
              <IoWallet size="18" /> Connect
            </Button>
          )}

          {isWalletOpen && <WalletModal />}
        </div>
      </nav>
    </>
  );
}

export default Header;
