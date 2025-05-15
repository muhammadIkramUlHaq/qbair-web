import { ParsedParams, TripType, ValidationResult } from "@/types/trip";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function isValidDateFormat(value?: string | null): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(value);

  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  );
}

export const validateForm = (
  departureDate: string,
  returnDate: string,
  tripType: TripType
): ValidationResult => {
  const errors: ValidationResult = {};
  const today = formatDate();

  if (!departureDate || !isValidDateFormat(departureDate)) {
    errors.departureDate = "Please enter a valid departure date.";
  } else if (departureDate < today) {
    errors.departureDate = "Departure date cannot be in the past.";
  }

  if (tripType === TripType.TWO_WAY) {
    if (!returnDate || !isValidDateFormat(returnDate)) {
      const msg = "Please enter a valid return date.";
      errors.returnDate = msg;
    } else if (returnDate < departureDate) {
      const msg = "Return date must be after departure date.";
      errors.returnDate = msg;
    }
  }

  return errors;
};

export function parseQueryParams(searchParams: URLSearchParams): ParsedParams {
  const today = formatDate();
  const paramTrip = searchParams.get("trip") as TripType | null;
  const paramDeparture = searchParams.get("departure");
  const paramReturn = searchParams.get("return");

  const tripType =
    paramTrip === TripType.TWO_WAY ? TripType.TWO_WAY : TripType.ONE_WAY;

  const departureDate = isValidDateFormat(paramDeparture)
    ? paramDeparture!
    : today;

  const returnDate =
    tripType === TripType.TWO_WAY
      ? isValidDateFormat(paramReturn)
        ? paramReturn!
        : getNextDay(departureDate)
      : "";

  return {
    tripType,
    departureDate,
    returnDate,
  };
}
