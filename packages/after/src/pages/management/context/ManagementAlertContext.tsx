import { createContext, useState, useCallback, type ReactNode } from "react";

type AlertVariant = "success" | "error";

interface AlertState {
  isVisible: boolean;
  message: string;
  variant: AlertVariant;
}

interface ManagementAlertContextType {
  alert: AlertState;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  hideAlert: () => void;
}

export const ManagementAlertContext =
  createContext<ManagementAlertContextType | null>(null);

interface ManagementAlertProviderProps {
  children: ReactNode;
}

export const ManagementAlertProvider = ({
  children,
}: ManagementAlertProviderProps) => {
  const [alert, setAlert] = useState<AlertState>({
    isVisible: false,
    message: "",
    variant: "success",
  });

  const showSuccess = useCallback((message: string) => {
    setAlert({ isVisible: true, message, variant: "success" });
  }, []);

  const showError = useCallback((message: string) => {
    setAlert({ isVisible: true, message, variant: "error" });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return (
    <ManagementAlertContext.Provider
      value={{ alert, showSuccess, showError, hideAlert }}
    >
      {children}
    </ManagementAlertContext.Provider>
  );
};

