import { useState } from "react";
import { FormInput } from "./molecules/FormInput";
import { FormSelect } from "./molecules/FormSelect";
import { Button } from "./ui/button";
import { Alert } from "./organisms/Alert";
import { userService } from "@/services/userService";
import { useManagementData } from "@/hooks/useManagementData";
import { useManagementAlert } from "@/hooks/useManagementAlert";
import type { User } from "@/services/userService";

interface UserFormProps {
  data: User | null; // null = create, User = edit
  onCancel: () => void;
}

export const UserForm = ({ data, onCancel }: UserFormProps) => {
  const { loadData } = useManagementData();
  const { showSuccess, showError } = useManagementAlert();
  const isEditMode = data !== null;

  const [formData, setFormData] = useState<Partial<User>>(data ?? {});

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await userService.update(data.id, formData);
        showSuccess("사용자가 수정되었습니다");
      } else {
        await userService.create({
          username: formData.username!,
          email: formData.email!,
          role: formData.role || "user",
          status: formData.status || "active",
        });
        showSuccess("사용자가 생성되었습니다");
      }
      await loadData();
      onCancel();
    } catch (error: any) {
      showError(
        error.message || `${isEditMode ? "수정" : "생성"}에 실패했습니다`
      );
    }
  };

  return (
    <>
      <div className="modal-body">
        {isEditMode && (
          <Alert variant="info">
            ID: {data.id} | 생성일: {data.createdAt}
          </Alert>
        )}
        <div>
          <FormInput
            name="username"
            value={formData.username || ""}
            onChange={(value) => setFormData({ ...formData, username: value })}
            label="사용자명"
            placeholder="사용자명을 입력하세요"
            required
            width="full"
            fieldType="username"
          />
          <FormInput
            name="email"
            value={formData.email || ""}
            onChange={(value) => setFormData({ ...formData, email: value })}
            label="이메일"
            placeholder="이메일을 입력하세요"
            type="email"
            required
            width="full"
            fieldType="email"
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              name="role"
              value={formData.role || "user"}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  role: value as "admin" | "moderator" | "user",
                })
              }
              options={[
                { value: "user", label: "사용자" },
                { value: "moderator", label: "운영자" },
                { value: "admin", label: "관리자" },
              ]}
              label="역할"
              size="md"
            />
            <FormSelect
              name="status"
              value={formData.status || "active"}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as "active" | "inactive" | "suspended",
                })
              }
              options={[
                { value: "active", label: "활성" },
                { value: "inactive", label: "비활성" },
                { value: "suspended", label: "정지" },
              ]}
              label="상태"
              size="md"
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button onClick={handleSubmit}>
          {isEditMode ? "수정 완료" : "생성"}
        </Button>
      </div>
    </>
  );
};
