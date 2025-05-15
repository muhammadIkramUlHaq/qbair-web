import { FC } from "react";
import logo from "@/assets/qbair.png";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <img src={logo} alt="QbAir Logo" className="w-10 h-10" />
      <h1 className="text-xl font-semibold">Welcome to QbAir Airline</h1>
    </div>
  );
};

export default Header;
