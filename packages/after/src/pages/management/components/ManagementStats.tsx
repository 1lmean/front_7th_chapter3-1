import { useMemo } from "react";
import { ManagementStatCard } from "./MangementStatCard";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";
import { useManagementTab } from "../hooks/useManagementTab";
import { useManagementData } from "../hooks/useManagementData";

type StatVariant = "blue" | "green" | "orange" | "red" | "gray";

interface StatItem {
  label: string;
  value: number;
  variant: StatVariant;
}

const getStats = (
  entityType: "user" | "post",
  data: User[] | Post[]
): StatItem[] => {
  if (entityType === "user") {
    const users = data as User[];
    return [
      { label: "전체", value: users.length, variant: "blue" },
      {
        label: "활성",
        value: users.filter((u) => u.status === "active").length,
        variant: "green",
      },
      {
        label: "비활성",
        value: users.filter((u) => u.status === "inactive").length,
        variant: "orange",
      },
      {
        label: "정지",
        value: users.filter((u) => u.status === "suspended").length,
        variant: "red",
      },
      {
        label: "관리자",
        value: users.filter((u) => u.role === "admin").length,
        variant: "gray",
      },
    ];
  }

  const posts = data as Post[];
  return [
    { label: "전체", value: posts.length, variant: "blue" },
    {
      label: "게시됨",
      value: posts.filter((p) => p.status === "published").length,
      variant: "green",
    },
    {
      label: "임시저장",
      value: posts.filter((p) => p.status === "draft").length,
      variant: "orange",
    },
    {
      label: "보관됨",
      value: posts.filter((p) => p.status === "archived").length,
      variant: "red",
    },
    {
      label: "총 조회수",
      value: posts.reduce((sum, p) => sum + p.views, 0),
      variant: "gray",
    },
  ];
};

export const ManagementStats = () => {
  const { entityType } = useManagementTab();
  const { data } = useManagementData();

  // 현재 데이터 규모(수십~수백 개)에서는 useMemo 없이도 충분하지만,
  // 데이터가 많아질 경우를 대비해 메모이제이션 적용
  // 참고: 성능 문제가 측정되기 전까지는 과도한 최적화 지양
  const stats = useMemo(
    () => getStats(entityType, data as User[] | Post[]),
    [entityType, data]
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
      {stats.map((stat) => (
        <ManagementStatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          variant={stat.variant}
        />
      ))}
    </div>
  );
};
