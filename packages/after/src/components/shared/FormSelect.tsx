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

/**
 * FormSelect - 네이티브 select 기반 폼 컴포넌트
 *
 * 📌 설계 결정:
 * - 네이티브 <select> 사용 (테스트 호환성, 접근성)
 * - Radix UI Select 대신 선택한 이유:
 *   1. 테스트에서 user.selectOptions() 사용 가능
 *   2. 모바일에서 네이티브 피커 활용
 *   3. 스크린 리더 호환성 우수
 */
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        className={cn(
          "border-input bg-transparent dark:bg-input/30 ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[size],
          widthClasses[width],
          error && "border-destructive"
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {helpText && !error && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};
