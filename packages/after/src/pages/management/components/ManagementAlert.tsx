import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CircleCheck, CircleX, Info, X } from "lucide-react";

interface ManagementAlertProps {
  message: string;
  variant: "success" | "error" | "info";
  onClose?: () => void; // info일 때는 optional
}

export const ManagementAlert = ({
  message,
  variant,
  onClose,
}: ManagementAlertProps) => {
  const isSuccess = variant === "success";
  const isInfo = variant === "info";

  const getAlertStyles = () => {
    if (isSuccess) return "border-green-500 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200 dark:border-green-800";
    if (isInfo) return "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800";
    // error: 빨간 배경 추가
    return "border-red-500 bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200 dark:border-red-800";
  };

  const getIcon = () => {
    if (isSuccess) return <CircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />;
    if (isInfo) return <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    return <CircleX className="h-4 w-4" />;
  };

  const getTitle = () => {
    if (isSuccess) return "성공";
    if (isInfo) return "정보";
    return "오류";
  };

  return (
    <div className="mb-2.5">
      <Alert
        variant="default"  // ← 모든 경우 default로 변경 (스타일은 className으로 적용)
        className={getAlertStyles()}
      >
        {getIcon()}
        <AlertTitle>{getTitle()}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        {!isInfo && onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-sm opacity-70 hover:opacity-100 transition-opacity duration-[--duration-fast]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </Alert>
    </div>
  );
};
