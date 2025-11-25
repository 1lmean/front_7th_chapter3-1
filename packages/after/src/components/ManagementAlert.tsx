import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CircleCheck, CircleX, X } from "lucide-react";

interface ManagementAlertProps {
  message: string;
  variant: "success" | "error";
  onClose: () => void;
}

export const ManagementAlert = ({
  message,
  variant,
  onClose,
}: ManagementAlertProps) => {
  const isSuccess = variant === "success";

  return (
    <div className="mb-2.5">
      <Alert
        variant={isSuccess ? "default" : "destructive"}
        className={
          isSuccess ? "border-green-500 bg-green-50 text-green-800" : ""
        }
      >
        {isSuccess ? (
          <CircleCheck className="h-4 w-4 text-green-600" />
        ) : (
          <CircleX className="h-4 w-4" />
        )}
        <AlertTitle>{isSuccess ? "성공" : "오류"}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  );
};
