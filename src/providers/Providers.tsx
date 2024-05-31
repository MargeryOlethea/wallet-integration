"use client";
import ReactQueryProvider from "./ReactQueryProvider";
import { WalletProvider } from "./WalletProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactQueryProvider>
        <WalletProvider>{children}</WalletProvider>
      </ReactQueryProvider>
    </>
  );
}

export default Providers;
