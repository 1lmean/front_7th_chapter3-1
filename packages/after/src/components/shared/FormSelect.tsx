import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormSelectProps {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helpText?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  width?: "small" | "medium" | "large" | "full";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 text-xs",
  md: "h-9 text-sm",
  lg: "h-10 text-base",
};

const widthClasses = {
  small: "w-32",
  medium: "w-48",
  large: "w-64",
  full: "w-full",
};

export const FormSelect = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  helpText,
  placeholder,
  required = false,
  disabled = false,
  size = "md",
  width = "full",
  className,
}: FormSelectProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id={name}
          aria-invalid={!!error}
          className={cn(
            sizeClasses[size],
            widthClasses[width],
            error && "border-destructive"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {helpText && !error && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};
