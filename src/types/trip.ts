export enum TripType {
  ONE_WAY = "one-way",
  TWO_WAY = "two-way",
}

export interface ValidationResult {
  departureDate?: string;
  returnDate?: string;
}

export interface ParsedParams {
  tripType: TripType;
  departureDate: string;
  returnDate: string;
}
