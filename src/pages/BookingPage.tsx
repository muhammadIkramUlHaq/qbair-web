import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import FormField from "@/components/FormField";
import TripTypeSelector from "@/components/TripTypeSelector";
import PrimaryButton from "@/components/PrimaryButton";
import Header from "@/components/Header";
import {
  cn,
  formatDate,
  getNextDay,
  isValidDate,
  validateForm,
} from "@/lib/utils";
import { TripType } from "@/types/trip";

const BookingPage = () => {
  const today = formatDate();
  const [searchParams] = useSearchParams();
  const [tripType, setTripType] = useState<TripType>(TripType.ONE_WAY);
  const [departureDate, setDepartureDate] = useState<string>(today);
  const [returnDate, setReturnDate] = useState<string>("");
  const [errors, setErrors] = useState<{
    departureDate?: string;
    returnDate?: string;
  }>({});
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const paramTrip = searchParams.get("trip") as TripType | null;
    const paramDeparture = searchParams.get("departure");
    const paramReturn = searchParams.get("return");

    const trip =
      paramTrip === TripType.TWO_WAY ? TripType.TWO_WAY : TripType.ONE_WAY;

    const departure = isValidDate(paramDeparture) ? paramDeparture! : today;

    // Default return to empty unless trip is two-way
    let returnVal = "";
    if (trip === TripType.TWO_WAY) {
      if (isValidDate(paramReturn)) {
        returnVal = paramReturn!;
      } else {
        // Fallback: return = departure + 1 day
        returnVal = getNextDay(departure);
      }
    }

    setTripType(trip);
    setDepartureDate(departure);
    setReturnDate(returnVal);
  }, [searchParams, today]);

  const clearError = (field: "departureDate" | "returnDate") =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleTripTypeChange = (type: TripType) => {
    setTripType(type);
    if (type === TripType.ONE_WAY) {
      setReturnDate("");
      setErrors((prev) => ({ ...prev, returnDate: undefined }));
    } else if (type === TripType.TWO_WAY && !returnDate) {
      setReturnDate(getNextDay(departureDate));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm(departureDate, returnDate, tripType);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowDialog(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "bg-white/90 border border-gray-200 rounded-xl",
          "backdrop-blur-sm p-10",
          "rounded-xl shadow-lg",
          "transition-shadow duration-300",
          "space-y-6 w-full max-w-md",
          "hover:shadow-xl"
        )}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <Header />
          <h2 className="text-base text-gray-600">Book a Trip</h2>
        </div>

        <TripTypeSelector value={tripType} onChange={handleTripTypeChange} />

        <FormField
          label="Departure Date"
          type="date"
          value={departureDate}
          min={today}
          onChange={(e) => {
            setDepartureDate(e.target.value);
            clearError("departureDate");
          }}
          error={errors.departureDate}
        />

        <FormField
          label="Return Date"
          type="date"
          value={returnDate}
          min={today}
          onChange={(e) => {
            setReturnDate(e.target.value);
            clearError("returnDate");
          }}
          disabled={tripType === TripType.ONE_WAY}
          className={tripType === TripType.ONE_WAY ? "text-gray-400" : ""}
          error={errors.returnDate}
        />

        <div className="flex justify-center">
          <PrimaryButton label="Submit" type="submit" />
        </div>
      </form>

      {showDialog && (
        <ConfirmationDialog
          from={departureDate}
          to={tripType === TripType.TWO_WAY ? returnDate : undefined}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};

export default BookingPage;
