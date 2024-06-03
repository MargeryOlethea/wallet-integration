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

export function timeFormatter(
  timestamp: string | number,
  withYear: boolean = true,
): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (withYear) {
    return `${year}/${month}/${day}, ${hours}:${minutes}`;
  } else {
    return `${month}/${day}, ${hours}:${minutes}`;
  }
}
