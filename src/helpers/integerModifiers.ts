export const microCoinConverter = (amount: number, denom: string) => {
  let convertedAmount;

  // Convert the amount based on the denomination
  if (denom === "DYM") {
    convertedAmount = amount / 1_000_000_000_000_000;
  } else {
    convertedAmount = amount / 1_000_000;
  }

  // Format the number to always have 4 decimal places
  const formattedAmount = convertedAmount.toFixed(4);

  // Add commas as thousand separators
  const parts = formattedAmount.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
};
