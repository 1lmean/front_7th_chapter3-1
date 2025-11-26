import { useManagementTab } from "@/hooks/useManagementTab";

export const ManagementTab = () => {
  const { entityType, setEntityType } = useManagementTab();

  const baseButtonClass =
    "px-4 py-2 text-sm border border-gray-400 cursor-pointer rounded";
  const activeClass = "font-bold bg-blue-600 text-white";
  const inactiveClass = "font-normal bg-gray-100 text-gray-800";

  return (
    <div className="mb-4 border-b-2 border-gray-300 pb-1">
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
