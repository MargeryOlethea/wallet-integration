"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { IoWallet } from "react-icons/io5";
import { usePathname } from "next/navigation";
import WalletModal from "./WalletModal";
import { useState } from "react";
import { useWallet } from "@/providers/WalletProvider";
import Image from "next/image";

function Header() {
  // navigations
  const navigations = [
    { name: "Staking", href: "/staking" },
    { name: "Governance", href: "/governance" },
  ];

  const pathname = usePathname();

  // modal
  const [isOpen, setOpenModal] = useState(false);

  // wallet info
  const { wallet, userAddress } = useWallet();

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
          {wallet ? (
            <Button
              className="flex gap-2"
              onClick={() => setOpenModal(!isOpen)}
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
              {userAddress!.slice(0, 6)}...
            </Button>
          ) : (
            <Button
              className="flex gap-2"
              onClick={() => setOpenModal(!isOpen)}
            >
              <IoWallet size="18" /> Connect
            </Button>
          )}

          {isOpen && <WalletModal />}
        </div>
      </nav>
    </>
  );
}

export default Header;
