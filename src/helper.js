import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
export const mergeClasses = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
