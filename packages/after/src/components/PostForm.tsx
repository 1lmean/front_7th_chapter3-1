import { useState } from "react";
import { FormInput } from "./templates/FormInput";
import { FormSelect } from "./templates/FormSelect";
import { FormTextarea } from "./molecules/FormTextarea";
import { Button } from "./ui/button";
import { ManagementAlert } from "./ManagementAlert";
import { postService } from "@/services/postService";
import { useManagementData } from "@/hooks/useManagementData";
import { useManagementAlert } from "@/hooks/useManagementAlert";
import type { Post } from "@/services/postService";

interface PostFormProps {
  data: Post | null; // null = create, Post = edit
  onCancel: () => void;
}

export const PostForm = ({ data, onCancel }: PostFormProps) => {
  const { loadData } = useManagementData();
  const { showSuccess, showError } = useManagementAlert();
  const isEditMode = data !== null;

  const [formData, setFormData] = useState<Partial<Post>>(data ?? {});

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await postService.update(data.id, formData);
        showSuccess("게시글이 수정되었습니다");
      } else {
        await postService.create({
          title: formData.title!,
          content: formData.content || "",
          author: formData.author!,
          category: formData.category!,
          status: formData.status || "draft",
        });
        showSuccess("게시글이 생성되었습니다");
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
          <ManagementAlert
            message={`ID: ${data.id} | 생성일: ${data.createdAt} | 조회수: ${data.views}`}
            variant="info"
            onClose={() => {}}
          />
        )}
        <div>
          <FormInput
            name="title"
            value={formData.title || ""}
            onChange={(value) => setFormData({ ...formData, title: value })}
            label="제목"
            placeholder="게시글 제목을 입력하세요"
            required
            width="full"
            fieldType="postTitle"
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              name="author"
              value={formData.author || ""}
              onChange={(value) => setFormData({ ...formData, author: value })}
              label="작성자"
              placeholder="작성자명"
              required
              width="full"
            />
            <FormSelect
              name="category"
              value={formData.category || ""}
              onChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              options={[
                { value: "development", label: "Development" },
                { value: "design", label: "Design" },
                { value: "accessibility", label: "Accessibility" },
              ]}
              label="카테고리"
              placeholder="카테고리 선택"
              size="md"
            />
          </div>
          <FormTextarea
            name="content"
            value={formData.content || ""}
            onChange={(value) => setFormData({ ...formData, content: value })}
            label="내용"
            placeholder="게시글 내용을 입력하세요"
            rows={6}
          />
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
