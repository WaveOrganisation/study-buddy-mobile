import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
//12
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// very good word
