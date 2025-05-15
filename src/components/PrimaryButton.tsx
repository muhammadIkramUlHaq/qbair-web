import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  children?: ReactNode;
  className?: string;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  label,
  children,
  className,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "bg-qbair text-white text-sm font-medium px-5 py-2 rounded-md",
        "hover:bg-qbair-dark focus:outline-none",
        "transition hover:shadow-md",
        className
      )}
      {...props}
    >
      {label || children}
    </button>
  );
};

export default PrimaryButton;
