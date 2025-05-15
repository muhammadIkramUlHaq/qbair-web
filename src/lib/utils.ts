import { TripType } from "@/types/trip";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface ValidationResult {
  departureDate?: string;
  returnDate?: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns the next day formatted as yyyy-mm-dd,
 * based on the provided date string.
 */
export function getNextDay(dateString: string): string {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return formatDate(date);
}

export function isValidDate(
  value?: string | null,
  minDate: string = formatDate()
): boolean {
  return !!value && /^\d{4}-\d{2}-\d{2}$/.test(value) && value >= minDate;
}

export const validateForm = (
  departureDate: string,
  returnDate: string,
  tripType: TripType
): ValidationResult => {
  const errors: ValidationResult = {};
  const today = formatDate();

  if (!departureDate || !isValidDate(departureDate)) {
    errors.departureDate = "Please enter a valid departure date.";
  } else if (departureDate < today) {
    errors.departureDate = "Departure date cannot be in the past.";
  }

  if (tripType === TripType.TWO_WAY) {
    if (!returnDate || !isValidDate(returnDate)) {
      const msg = "Please enter a valid return date.";
      errors.returnDate = msg;
    } else if (returnDate < departureDate) {
      const msg = "Return date must be after departure date.";
      errors.returnDate = msg;
    }
  }

  return errors;
};
