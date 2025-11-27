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
    if (isSuccess) return "border-green-500 bg-green-50 text-green-800";
    if (isInfo) return "border-blue-500 bg-blue-50 text-blue-800";
    return ""; // error는 destructive 기본 스타일
  };

  const getIcon = () => {
    if (isSuccess) return <CircleCheck className="h-4 w-4 text-green-600" />;
    if (isInfo) return <Info className="h-4 w-4 text-blue-600" />;
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
        variant={isSuccess || isInfo ? "default" : "destructive"}
        className={getAlertStyles()}
      >
        {getIcon()}
        <AlertTitle>{getTitle()}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        {!isInfo && onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </Alert>
    </div>
  );
};
