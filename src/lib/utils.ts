import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (days: number, timestamp: number) => {
  const date = new Date(timestamp);

  if (days === 1) {
    return date?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (days === 7) {
    return date?.toLocaleDateString([], { weekday: "short" });
  }

  return date?.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};
