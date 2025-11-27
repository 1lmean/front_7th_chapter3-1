import { useManagementTab } from "../hooks/useManagementTab";

export const ManagementTab = () => {
  const { entityType, setEntityType } = useManagementTab();

  const baseButtonClass =
    "px-4 py-2 text-sm border border-border cursor-pointer rounded-md";
  const activeClass = "font-bold bg-primary text-primary-foreground";
  const inactiveClass = "font-normal bg-muted text-muted-foreground";

  return (
    <div className="mb-4 border-b-2 border-border pb-1">
      <button
        onClick={() => setEntityType("post")}
        className={`${baseButtonClass} mr-1 ${
          entityType === "post" ? activeClass : inactiveClass
        }`}
      >
        게시글
      </button>
      <button
        onClick={() => setEntityType("user")}
        className={`${baseButtonClass} ${
          entityType === "user" ? activeClass : inactiveClass
        }`}
      >
        사용자
      </button>
    </div>
  );
};
