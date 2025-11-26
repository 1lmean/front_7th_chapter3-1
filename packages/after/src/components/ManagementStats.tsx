import { ManagementStatCard } from "./MangementStatCard";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";
import { useManagementTab } from "@/hooks/useManagementTab";
type Entity = User | Post;
interface ManagementStatsProps {
  data: Entity[];
}

const getStats = (entityType: "user" | "post", data: User[] | Post[]) => {
  if (entityType === "user") {
    const users = data as User[];
    return {
      total: users.length,
      stat1: {
        label: "활성",
        value: users.filter((u) => u.status === "active").length,
        color: "#2e7d32",
      },
      stat2: {
        label: "비활성",
        value: users.filter((u) => u.status === "inactive").length,
        color: "#ed6c02",
      },
      stat3: {
        label: "정지",
        value: users.filter((u) => u.status === "suspended").length,
        color: "#d32f2f",
      },
      stat4: {
        label: "관리자",
        value: users.filter((u) => u.role === "admin").length,
        color: "#1976d2",
      },
    };
  } else {
    const posts = data as Post[];
    return {
      total: posts.length,
      stat1: {
        label: "게시됨",
        value: posts.filter((p) => p.status === "published").length,
        color: "#2e7d32",
      },
      stat2: {
        label: "임시저장",
        value: posts.filter((p) => p.status === "draft").length,
        color: "#ed6c02",
      },
      stat3: {
        label: "보관됨",
        value: posts.filter((p) => p.status === "archived").length,
        color: "rgba(0, 0, 0, 0.6)",
      },
      stat4: {
        label: "총 조회수",
        value: posts.reduce((sum, p) => sum + p.views, 0),
        color: "#1976d2",
      },
    };
  }
};

export const ManagementStats = ({ data }: ManagementStatsProps) => {
  const { entityType } = useManagementTab();
  const stats = getStats(entityType, data as User[] | Post[]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
      <ManagementStatCard label="전체" value={stats.total} variant="blue" />

      <ManagementStatCard
        label={stats.stat1.label}
        value={stats.stat1.value}
        variant="green"
      />

      <ManagementStatCard
        label={stats.stat2.label}
        value={stats.stat2.value}
        variant="orange"
      />

      <ManagementStatCard
        label={stats.stat3.label}
        value={stats.stat3.value}
        variant="red"
      />

      <ManagementStatCard
        label={stats.stat4.label}
        value={stats.stat4.value}
        variant="gray"
      />
    </div>
  );
};
