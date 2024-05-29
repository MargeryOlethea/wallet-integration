export const microCoinConverter = (amount: number, denom: string) => {
  if (denom === "udym") {
    return amount / 1_000_000_000_000_000;
  }
  return amount / 1_000_000;
};
