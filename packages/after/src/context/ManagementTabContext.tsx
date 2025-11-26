import { createContext, useState, type ReactNode } from "react";

type EntityType = "user" | "post";

interface ManagementTabContextType {
  entityType: EntityType;
  setEntityType: (type: EntityType) => void;
}

export const ManagementTabContext =
  createContext<ManagementTabContextType | null>(null);

interface ManagementTabProviderProps {
  children: ReactNode;
}

export const ManagementTabProvider = ({
  children,
}: ManagementTabProviderProps) => {
  const [entityType, setEntityType] = useState<EntityType>("post");

  return (
    <ManagementTabContext.Provider value={{ entityType, setEntityType }}>
      {children}
    </ManagementTabContext.Provider>
  );
};
