import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = ({ label, error, className, type, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-1 text-left w-full">
      <label className="font-medium text-black">{label}</label>
      <input
        type={type}
        {...props}
        className={cn(
          "px-4 py-2 rounded-md border border-gray-300 text-black w-full",
          "focus:outline-none focus:ring-2 focus:ring-qbair-dark",
          "transition duration-150 ease-in-out",
          type === "date" && "cursor-pointer",
          error && "border-red-500",
          className
        )}
      />
      {error && (
        <div className="text-sm text-red-500 mt-1">
          ⚠️ <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;
