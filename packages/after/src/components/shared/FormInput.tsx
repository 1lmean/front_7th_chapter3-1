import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FieldType = "username" | "email" | "postTitle" | "slug" | "normal";

interface FormInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "url";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  width?: "small" | "medium" | "large" | "full";
  /**
   * fieldType - 필드 유형 힌트 (API 호환성용)
   *
   * ⚠️ 이 컴포넌트는 fieldType에 따른 검증을 수행하지 않습니다.
   * 검증 로직은 외부(react-hook-form, zod 등)에서 처리하세요.
   *
   * 용도:
   * - 기존 molecules/FormInput과의 API 호환성
   * - 외부 검증 로직에서 필드 유형 참조 시 활용
   */
  fieldType?: FieldType;
  className?: string;
}

const widthClasses = {
  small: "w-32",
  medium: "w-48",
  large: "w-64",
  full: "w-full",
};

/**
 * FormInput - shadcn/ui Input을 감싼 폼 입력 컴포넌트
 *
 * 📌 설계 원칙:
 * - 순수 UI 컴포넌트: 비즈니스 로직 없음
 * - 검증은 외부에서 처리 (react-hook-form, zod 등)
 * - error prop으로 에러 메시지만 표시
 *
 * 기존 molecules/FormInput과 달리 도메인 검증 로직을 포함하지 않습니다.
 */
export const FormInput = ({
  name,
  value,
  onChange,
  label,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  width = "full",
  fieldType: _fieldType, // API 호환성용, 검증은 외부에서 처리
  className,
}: FormInputProps) => {
  void _fieldType; // 미사용 변수 경고 방지
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        className={cn(widthClasses[width], error && "border-destructive")}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
      {helpText && !error && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};
