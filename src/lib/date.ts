export default function formatDate({
  dateInput,
  fullText = false,
}: {
  dateInput: Date | string | number;
  fullText?: boolean;
}): string {
  let date: Date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === "string") {
    date = new Date(dateInput);
  } else if (typeof dateInput === "number") {
    date = new Date(dateInput);
  } else {
    console.error("Invalid date input:", dateInput);
    return "Invalid Date";
  }

  if (isNaN(date.getTime())) {
    console.error("Invalid date after parsing:", dateInput);
    return "Invalid Date";
  }

  const now: Date = new Date();
  const diffInSeconds: number = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (diffInSeconds < 3600) {
    return "Just now";
  }

  if (diffInSeconds < 86400) {
    const hours: number = Math.floor(diffInSeconds / 3600);
    return fullText ? `${hours} hours ago` : `${hours}h ago`;
  }

  if (diffInSeconds < 604800) {
    const days: number = Math.floor(diffInSeconds / 86400);
    return fullText ? `${days} days ago` : `${days}d ago`;
  }

  if (date.getFullYear() === now.getFullYear()) {
    const monthNames: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month: string = monthNames[date.getMonth()];
    const day: number = date.getDate();
    return `${month} ${day}`;
  }

  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month: string = monthNames[date.getMonth()];
  const day: number = date.getDate();
  const year: number = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
