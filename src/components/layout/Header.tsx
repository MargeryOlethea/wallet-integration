"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import WalletModal from "./WalletModal";
import { useEffect, useState } from "react";
import Image from "next/image";
import { truncateString } from "@/helpers/stringModifiers";
import { useWallet } from "@/hooks/useWallet";
import { useModal } from "@/hooks/useModal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMenu } from "react-icons/io5";

function Header() {
  // navigations
  const navigations = [
    { name: "Staking", href: "/staking" },
    { name: "Proposals", href: "/proposals" },
  ];

  const { isDesktop, isMobile, isTablet } = useMediaQuery();

  const pathname = usePathname();

  // modal
  const { isWalletModalOpen, setWalletModalOpen } = useModal();

  // wallet info
  const { wallet, userAddress, setWallet, setUserAddress } = useWallet();

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
        <div className="flex gap-2 items-center">
          {/* dropdown */}
          {(isMobile || isTablet) && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IoMenu size="25" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="ml-10 py-2">
                {navigations.map((navigation, idx) => (
                  <DropdownMenuItem key={idx}>
                    <Link
                      href={navigation.href}
                      className="hover:font-semibold hover:text-primary/90"
                    >
                      <p
                        className={`${
                          pathname === navigation.href && "font-semibold"
                        }`}
                      >
                        {navigation.name}
                      </p>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* link */}
          <Link href="/" className="hover:text-primary/90">
            <h1 className="text-2xl max-lg:text-xl">Wallet App</h1>
          </Link>
        </div>

        {/* navigation */}
        {isDesktop && (
          <div className="flex gap-8">
            {navigations.map((navigation, idx) => (
              <Link
                key={idx}
                href={navigation.href}
                className="hover:font-semibold hover:text-primary/90"
              >
                <p
                  className={`${
                    pathname === navigation.href && "font-semibold"
                  }`}
                >
                  {navigation.name}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* wallet connect */}
        <div className="relative">
          {wallet && userAddress && (
            <Button
              className="flex gap-2"
              onClick={() => setWalletModalOpen(!isWalletModalOpen)}
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
          )}

          <WalletModal />
        </div>
      </nav>
    </>
  );
}

export default Header;
