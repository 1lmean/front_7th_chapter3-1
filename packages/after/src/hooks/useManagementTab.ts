import { useContext } from "react";
import { ManagementTabContext } from "@/context/ManagementTabContext";

export const useManagementTab = () => {
  const context = useContext(ManagementTabContext);

  if (!context) {
    throw new Error(
      "useManagementTab must be used within ManagementTabProvider"
    );
  }

  return context;
};
