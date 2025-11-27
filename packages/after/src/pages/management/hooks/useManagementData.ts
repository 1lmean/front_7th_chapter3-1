import { useContext } from "react";
import { ManagementDataContext } from "../context/ManagementDataContext";

export const useManagementData = () => {
  const context = useContext(ManagementDataContext);

  if (!context) {
    throw new Error(
      "useManagementData must be used within ManagementDataProvider"
    );
  }

  return context;
};
