import { WorkspaceData } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const extractUserInitials = (username: string): string => {
  const words = username.split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  } else {
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }
}

export function convertToLocaleString(
  date: Date,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleString(locale, options);
}

export const sortWorkspaces = (workspaces: WorkspaceData[]) => {
  return workspaces.sort(
    (a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
}