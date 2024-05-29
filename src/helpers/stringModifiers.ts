export function truncateString(
  str: string,
  maxChars: number = 75,
  cutLength: number = 5,
): string {
  if (str.length <= maxChars) {
    return str;
  }

  const ellipsis = "...";

  const frontPart = str.slice(0, cutLength);
  const endPart = str.slice(-cutLength);

  return `${frontPart}${ellipsis}${endPart}`;
}

export function splitMicroCoin(denom: string) {
  if (denom.startsWith("u")) {
    return denom.slice(1);
  } else return denom;
}
