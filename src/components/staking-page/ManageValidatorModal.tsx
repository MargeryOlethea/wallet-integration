import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ValidatorItem } from "@/types/validator.types";
import { IoClose } from "react-icons/io5";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TbAlertCircleFilled } from "react-icons/tb";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ModalProps {
  validator: ValidatorItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function ManageValidatorModal({
  validator,
  isOpen,
  onClose,
}: ModalProps) {
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    // Check if the click occurred on the background overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <Card className="relative w-1/3 h-2/3 p-5 flex flex-col justify-between">
        <button
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <IoClose size="25" />
        </button>
        <CardHeader>
          <CardTitle>{validator?.description?.moniker}</CardTitle>
          <CardDescription>
            Commission:{" "}
            {Math.floor(+validator.commission.commission_rates.rate * 100)}%
          </CardDescription>
          {/* alert */}
          <Alert className="bg-red-50 border-red-200 text-red-700">
            <AlertTitle className="flex gap-1 items-center text-sm">
              <TbAlertCircleFilled size="20" />
              Staking will lock your funds for 2 days
            </AlertTitle>
            <AlertDescription className="text-xs">
              You will need to undelegate in order for your staked assets to be
              liquid again. This process will take 2 days to complete.
            </AlertDescription>
          </Alert>
        </CardHeader>
        <CardContent>
          <Card className="my-2">
            {" "}
            <CardHeader className="flex flex-row justify-between">
              <p className="text-sm">
                Available Balances:{" "}
                <span className="font-semibold text-lg">123</span>
              </p>

              <Badge variant="secondary">ATOM</Badge>
            </CardHeader>
          </Card>
          <Card className="my-2">
            <CardHeader className="flex flex-row justify-between">
              <input
                type="text"
                placeholder="your staking amount"
                className="focus:border-transparent focus:outline-none active:outline-none active:border-none bg-transparent w-full font-semibold text-lg placeholder:font-light placeholder:text-sm"
              />
              <Badge variant="secondary">ATOM</Badge>
            </CardHeader>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              1/3
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              1/2
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              MAX
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Delegate</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
