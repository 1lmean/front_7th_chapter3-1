import { useContext } from "react";
import { ManagementAlertContext } from "../context/ManagementAlertContext";

export const useManagementAlert = () => {
  const context = useContext(ManagementAlertContext);

  if (!context) {
    throw new Error(
      "useManagementAlert must be used within ManagementAlertProvider"
    );
  }

  return context;
};

