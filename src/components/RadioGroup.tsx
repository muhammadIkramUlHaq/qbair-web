import { cn } from "@/lib/utils";

interface RadioOption<T> {
  label: string;
  value: T;
}

interface RadioGroupProps<T> {
  name: string;
  options: RadioOption<T>[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
  direction?: "row" | "column";
}

const RadioGroup = <T extends string | number>({
  name,
  options,
  selected,
  onChange,
  className,
  direction = "row",
}: RadioGroupProps<T>) => {
  return (
    <div
      className={cn(
        "flex",
        direction === "column" ? "flex-col gap-2" : "gap-6",
        className
      )}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className="accent-qbair"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
