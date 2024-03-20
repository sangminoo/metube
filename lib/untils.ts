import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const timeFormat = (time: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const timeNow = moment(time).fromNow();
  return timeNow;
};

export const extractTitle = (urlFormat: string) => {
  // urlFormat = "SƠN TÙNG M-TP - CHÚNG TA CỦA TƯƠNG LAI - OFFICIAL TEASER.mp4"
  const extensionRegex = /\.(mp4|avi|mov|wmv|flv|mkv|jpg|jpeg|png|gif)$/i;
  const title = urlFormat.replace(extensionRegex, "").trim();
  return title;
};
