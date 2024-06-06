import { Dispatch, SetStateAction } from "react";

interface HandleInputProps {
  value: string | number;
  balanceAmount: string | number;
  denom: string;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<string>>;
}
export const handleInput = ({
  value,
  denom,
  balanceAmount,
  setShowAlert,
  setAmount,
}: HandleInputProps) => {
  const balance =
    denom == "DYM"
      ? +balanceAmount / 1_000_000_000_000_000_000
      : +balanceAmount / 1_000_000;

  if (+value > balance) {
    setShowAlert(true);
    setAmount(value.toString());
  } else {
    setShowAlert(false);
    setAmount(value.toString());
  }
};
