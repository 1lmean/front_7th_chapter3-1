import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";
import { userService } from "@/services/userService";
import { postService } from "@/services/postService";

import { createContext, useState, type ReactNode } from "react";
import { useManagementTab } from "@/hooks/useManagementTab";

type Entity = User | Post;

export const ManagementDataContext =
  createContext<ManagementDataContextType | null>(null);

interface ManagementDataContextType {
  data: Entity[];
  loadData: () => Promise<void>;
}

interface ManagementDataProviderProps {
  children: ReactNode;
}

export const ManagementDataProvider = ({
  children,
}: ManagementDataProviderProps) => {
  const { entityType } = useManagementTab();
  const [data, setData] = useState<Entity[]>([]);

  const loadData = async () => {
    if (entityType === "user") {
      const result = await userService.getAll();
      setData(result);
    } else {
      const result = await postService.getAll();
      setData(result);
    }
  };

  return (
    <ManagementDataContext.Provider value={{ data, loadData }}>
      {children}
    </ManagementDataContext.Provider>
  );
};
