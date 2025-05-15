import { FC, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";

interface ConfirmationDialogProps {
  from: string;
  to?: string;
  onClose: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  from,
  to,
  onClose,
}) => {
  const days = to
    ? Math.max(
        1,
        Math.ceil(
          (new Date(to).getTime() - new Date(from).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 1;

  // Allow closing with ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg p-6 shadow-xl w-full max-w-sm transform transition-all duration-300">
        <div className="flex flex-col items-center space-y-3">
          <span className="text-3xl">✅</span>
          <h2 className="text-xl font-bold text-center">Trip Booked!</h2>
          <p className="text-center text-gray-700">
            {to ? (
              <>
                ✈️ Your <strong>return trip</strong> is booked!
                <br />
                📅 Duration:{" "}
                <strong>
                  {days} day{days > 1 ? "s" : ""}
                </strong>
                <br />
                🕓 From <strong>{from}</strong> to <strong>{to}</strong>.
              </>
            ) : (
              <>
                ✈️ Your <strong>one-way trip</strong> is booked!
                <br />
                🕓 Departure Date: <strong>{from}</strong>
              </>
            )}
          </p>
          <PrimaryButton label="OK" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
