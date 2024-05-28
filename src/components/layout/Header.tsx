"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { IoWallet } from "react-icons/io5";
import { usePathname } from "next/navigation";
import WalletModal from "./WalletModal";
import { useState } from "react";

function Header() {
  // navigations
  const navigations = [
    { name: "Staking", href: "/staking" },
    { name: "Governance", href: "/governance" },
  ];

  const pathname = usePathname();

  // modal
  const [isOpen, setOpenModal] = useState(false);

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
          <Button className="flex gap-2" onClick={() => setOpenModal(!isOpen)}>
            <IoWallet size="18" /> Connect
          </Button>

          {isOpen && <WalletModal setOpenModal={setOpenModal} />}
        </div>
      </nav>
    </>
  );
}

export default Header;
