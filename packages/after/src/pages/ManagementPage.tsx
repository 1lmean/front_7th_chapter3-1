import React, { useState, useEffect } from "react";
import { Button } from "../components/atoms";
import { Table } from "../components/organisms";
import { userService } from "../services/userService";
import { postService } from "../services/postService";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";
import "../styles/components.css";
import { ManagementLayout } from "@/components/templates/ManagementLayout";
import { ManagementModal } from "@/components/templates/ManagementModal";
import { ManagementTab } from "@/components/ManagementTab";
import { ManagementAlert } from "@/components/ManagementAlert";
import { ManagementStats } from "@/components/ManagementStats";
import { ManagementTabProvider } from "@/context/ManagementTabContext";
import { ManagementDataProvider } from "@/context/ManagementDataContext";
import { ManagementAlertProvider } from "@/context/ManagementAlertContext";
import { useManagementTab } from "@/hooks/useManagementTab";
import { useManagementData } from "@/hooks/useManagementData";
import { useManagementAlert } from "@/hooks/useManagementAlert";

type Entity = User | Post;

const ManagementPageContent: React.FC = () => {
  const { entityType } = useManagementTab();
  const { data, loadData } = useManagementData();
  const { alert, showSuccess, showError, hideAlert } = useManagementAlert();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);

  useEffect(() => {
    loadData();
    setIsModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const handleOpenCreateModal = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      if (entityType === "user") {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      showSuccess("삭제되었습니다");
    } catch (error: any) {
      showError(error.message || "삭제에 실패했습니다");
    }
  };

  const handleStatusAction = async (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => {
    if (entityType !== "post") return;

    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else if (action === "restore") {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      showSuccess(`${message}되었습니다`);
    } catch (error: any) {
      showError(error.message || "작업에 실패했습니다");
    }
  };

  const renderTableColumns = () => {
    if (entityType === "user") {
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "username", header: "사용자명", width: "150px" },
        { key: "email", header: "이메일" },
        { key: "role", header: "역할", width: "120px" },
        { key: "status", header: "상태", width: "120px" },
        { key: "createdAt", header: "생성일", width: "120px" },
        { key: "lastLogin", header: "마지막 로그인", width: "140px" },
        { key: "actions", header: "관리", width: "200px" },
      ];
    } else {
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "title", header: "제목" },
        { key: "author", header: "작성자", width: "120px" },
        { key: "category", header: "카테고리", width: "140px" },
        { key: "status", header: "상태", width: "120px" },
        { key: "views", header: "조회수", width: "100px" },
        { key: "createdAt", header: "작성일", width: "120px" },
        { key: "actions", header: "관리", width: "250px" },
      ];
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0f0" }}>
      <ManagementLayout>
        <ManagementTab />
        <div>
          <div style={{ marginBottom: "15px", textAlign: "right" }}>
            <Button variant="primary" size="md" onClick={handleOpenCreateModal}>
              새로 만들기
            </Button>
          </div>

          {alert.isVisible && (
            <ManagementAlert
              message={alert.message}
              variant={alert.variant}
              onClose={hideAlert}
            />
          )}

          <ManagementStats />

          <div
            style={{
              border: "1px solid #ddd",
              background: "white",
              overflow: "auto",
            }}
          >
            <Table
              columns={renderTableColumns()}
              data={data}
              striped
              hover
              entityType={entityType}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPublish={(id) => handleStatusAction(id, "publish")}
              onArchive={(id) => handleStatusAction(id, "archive")}
              onRestore={(id) => handleStatusAction(id, "restore")}
            />
          </div>
        </div>
      </ManagementLayout>

      <ManagementModal
        isOpen={isModalOpen}
        selectedItem={selectedItem}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export const ManagementPage: React.FC = () => {
  return (
    <ManagementTabProvider>
      <ManagementDataProvider>
        <ManagementAlertProvider>
          <ManagementPageContent />
        </ManagementAlertProvider>
      </ManagementDataProvider>
    </ManagementTabProvider>
  );
};
