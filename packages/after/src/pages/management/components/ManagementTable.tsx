import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

interface ManagementTableProps {
  columns?: Column[];
  data?: any[];
  striped?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: any) => void;
  entityType?: "user" | "post";
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

/**
 * 상태 뱃지 렌더링
 * - User status: active(활성), inactive(비활성), suspended(정지)
 * - Post status: published(게시됨), draft(임시저장), archived(보관됨)
 */
const StatusBadge = ({
  status,
  entityType,
}: {
  status: string;
  entityType: "user" | "post";
}) => {
  if (entityType === "user") {
    const config: Record<string, { label: string; className: string }> = {
      active: {
        label: "활성",
        className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800",
      },
      inactive: {
        label: "비활성",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800",
      },
      suspended: {
        label: "정지",
        className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800",
      },
    };
    const { label, className } = config[status] || {
      label: status,
      className: "",
    };
    return (
      <Badge variant="outline" className={className}>
        {label}
      </Badge>
    );
  }

  // Post status
  const config: Record<string, { label: string; className: string }> = {
    published: {
      label: "게시됨",
      className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800",
    },
    draft: {
      label: "임시저장",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800",
    },
    archived: {
      label: "보관됨",
      className: "bg-muted text-muted-foreground border-border",
    },
  };
  const { label, className } = config[status] || {
    label: status,
    className: "",
  };
  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

/**
 * 역할 뱃지 렌더링
 */
const RoleBadge = ({ role }: { role: string }) => {
  const config: Record<string, { label: string; className: string }> = {
    admin: {
      label: "관리자",
      className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800",
    },
    moderator: {
      label: "운영자",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800",
    },
    user: {
      label: "사용자",
      className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800",
    },
    guest: {
      label: "게스트",
      className: "bg-muted text-muted-foreground border-border",
    },
  };
  const { label, className } = config[role] || { label: role, className: "" };
  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

/**
 * 카테고리 뱃지 렌더링
 */
const CategoryBadge = ({ category }: { category: string }) => {
  const config: Record<string, { className: string }> = {
    development: { className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800" },
    design: { className: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-800" },
    accessibility: { className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800" },
  };
  const { className } = config[category] || {
    className: "bg-muted text-muted-foreground border-border",
  };
  return (
    <Badge variant="outline" className={className}>
      {category}
    </Badge>
  );
};

export const ManagementTable: React.FC<ManagementTableProps> = ({
  columns,
  data = [],
  striped = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setTableData(data);
    setCurrentPage(1);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection =
      sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return newDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return newDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData =
    searchable && searchTerm
      ? tableData.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tableData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const actualColumns =
    columns ||
    (tableData[0]
      ? Object.keys(tableData[0]).map((key) => ({
          key,
          header: key,
          width: undefined,
        }))
      : []);

  /**
   * 셀 렌더링 - entityType에 따라 다른 렌더링
   */
  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    // User 엔티티
    if (entityType === "user") {
      if (columnKey === "role") {
        return <RoleBadge role={value} />;
      }
      if (columnKey === "status") {
        return <StatusBadge status={value} entityType="user" />;
      }
      if (columnKey === "lastLogin") {
        return value || "-";
      }
      if (columnKey === "actions") {
        return (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete?.(row.id)}
            >
              삭제
            </Button>
          </div>
        );
      }
    }

    // Post 엔티티
    if (entityType === "post") {
      if (columnKey === "category") {
        return <CategoryBadge category={value} />;
      }
      if (columnKey === "status") {
        return <StatusBadge status={value} entityType="post" />;
      }
      if (columnKey === "views") {
        return value?.toLocaleString() || "0";
      }
      if (columnKey === "actions") {
        return (
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === "draft" && (
              <Button
                size="sm"
                className="bg-success hover:bg-success/90 text-success-foreground transition-colors duration-[--duration-fast]"
                onClick={() => onPublish?.(row.id)}
              >
                게시
              </Button>
            )}
            {row.status === "published" && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onArchive?.(row.id)}
              >
                보관
              </Button>
            )}
            {row.status === "archived" && (
              <Button size="sm" onClick={() => onRestore?.(row.id)}>
                복원
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete?.(row.id)}
            >
              삭제
            </Button>
          </div>
        );
      }
    }

    // React Element면 그대로 렌더링
    if (React.isValidElement(value)) {
      return value;
    }

    return value;
  };

  return (
    <div className="w-full">
      {/* 검색 */}
      {searchable && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72"
          />
        </div>
      )}

      {/* 테이블 */}
      <Table>
        <TableHeader>
          <TableRow>
            {actualColumns.map((column) => (
              <TableHead
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
                className={cn(sortable && "cursor-pointer select-none")}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={actualColumns.length}
                className="h-24 text-center text-muted-foreground"
              >
                데이터가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <TableRow
                key={row.id || rowIndex}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  onRowClick && "cursor-pointer",
                  striped && rowIndex % 2 === 1 && "bg-muted/50",
                  hover && "hover:bg-muted"
                )}
              >
                {actualColumns.map((column) => (
                  <TableCell key={column.key}>
                    {entityType ? renderCell(row, column.key) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            이전
          </Button>
          <span className="px-3 py-1 text-sm text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};
