export const microCoinConverter = (amount: number, denom: string) => {
  let convertedAmount;

  // Convert the amount based on the denomination
  if (denom === "DYM") {
    convertedAmount = amount / 1_000_000_000_000_000;
  } else {
    convertedAmount = amount / 1_000_000;
  }

  // Format the number to always have 4 decimal places
  let formattedAmount;

  if (denom === "DYM") {
    formattedAmount = convertedAmount.toFixed(2);
  } else {
    formattedAmount = convertedAmount.toFixed(4);
  }

  // Add commas as thousand separators
  const parts = formattedAmount.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return parts.join(",");
};

export const numberFormatter = (num: number, denom: string): string => {
  const suffixes: string[] = ["", "K", "M", "B", "T"];
  const amount = denom == "DYM" ? num / 1_000_000_000_000_000 : num / 1_000_000;
  if (amount < 1000) {
    return amount.toFixed(1);
  } else {
    const exp: number = Math.floor(Math.log10(amount) / 3);
    const roundedNum: string = (amount / Math.pow(1000, exp)).toFixed(1);
    return `${roundedNum} ${suffixes[exp]}`;
  }
};
