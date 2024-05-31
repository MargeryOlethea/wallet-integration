import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/useModal";

export default function DelegateModal() {
  // modal handling
  const { isDelegateModalOpen, setDelegateModalOpen } = useModal();
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      setDelegateModalOpen(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <Card className="relative w-1/3 h-2/3 p-5 flex flex-col justify-between">
        {/* close button */}
        <button
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
          onClick={() => setDelegateModalOpen(false)}
        >
          <IoClose size="25" />
        </button>
        <CardHeader>
          <CardTitle>MONIKER</CardTitle>

          {/* commission */}
          <CardDescription>Commission:</CardDescription>
        </CardHeader>
        <CardContent>CONTENT</CardContent>
        <CardFooter>
          <Button>Test</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
