"use client";
import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import { useWallet } from "@/hooks/useWallet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

function Governance() {
  const { wallet, userAddress } = useWallet();

  if (!wallet || !userAddress) {
    return <NoConnectedWalletHeader />;
  } else {
    return (
      <>
        <h1 className="text-xl">Governance</h1>
        <Table className="my-2">
          <TableHeader>
            <TableRow>
              <TableHead>#ID</TableHead>
              <TableHead>Proposal</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>End Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {"12345".split("").map((i) => (
              <TableRow key={i}>
                <TableCell className="flex items-center gap-2">
                  <p className="font-semibold text-xs">#1</p>
                </TableCell>
                <TableCell className="font-semibold">
                  <Link href="/governance/1">This is a Proposal</Link>
                </TableCell>
                <TableCell>
                  <Progress value={60} />
                </TableCell>

                <TableCell>Voting</TableCell>
                <TableCell>2 days left</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}

export default Governance;
