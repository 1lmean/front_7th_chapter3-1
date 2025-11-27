import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormTextareaProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
  className?: string;
}

/**
 * FormTextarea - shadcn/ui Textarea를 감싼 폼 컴포넌트
 *
 * 📌 설계 원칙:
 * - 순수 UI 컴포넌트: 비즈니스 로직 없음
 * - molecules/FormTextarea와 동일한 API
 */
export const FormTextarea = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 4,
  className,
}: FormTextareaProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        aria-invalid={!!error}
        className={cn(error && "border-destructive")}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
      {helpText && !error && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};
