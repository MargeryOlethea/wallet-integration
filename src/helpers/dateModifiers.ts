export function dayDifferenceCounter(endTime: string): string {
  const endDate: Date = new Date(endTime);
  const currentDate: Date = new Date();

  const difference: number = endDate.getTime() - currentDate.getTime();

  const daysDifference: number = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hoursDifference: number = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  if (daysDifference < 0) {
    return `${Math.abs(daysDifference)} ${
      Math.abs(daysDifference) === 1 ? "day" : "days"
    } ago`;
  } else if (daysDifference === 0) {
    if (hoursDifference > 0) {
      return `in ${hoursDifference} ${
        hoursDifference === 1 ? "hour" : "hours"
      }`;
    } else {
      return "Voting ends today";
    }
  } else {
    return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
  }
}
