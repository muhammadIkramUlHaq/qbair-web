import { FC } from "react";
import RadioGroup from "@/components/RadioGroup";
import { TripType } from "@/types/trip";

interface TripTypeSelectorProps {
  value: TripType;
  onChange: (value: TripType) => void;
  className?: string;
}

const TripTypeSelector: FC<TripTypeSelectorProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <RadioGroup
      name="trip-type"
      selected={value}
      onChange={onChange}
      className={className}
      options={[
        { label: "One-way", value: TripType.ONE_WAY },
        { label: "Two-way", value: TripType.TWO_WAY },
      ]}
    />
  );
};

export default TripTypeSelector;
