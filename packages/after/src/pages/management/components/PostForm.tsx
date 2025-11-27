import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostFormData } from "../schemas/postSchema";
import type { Post } from "@/services/postService";
import { useManagementData } from "../hooks/useManagementData";
import { useManagementAlert } from "../hooks/useManagementAlert";
import { postService } from "@/services/postService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ManagementAlert } from "./ManagementAlert";
import { cn } from "@/lib/utils";

interface PostFormProps {
  data: Post | null;
  onCancel: () => void;
}

export const PostForm = ({ data, onCancel }: PostFormProps) => {
  const { loadData } = useManagementData();
  const { showSuccess, showError } = useManagementAlert();
  const isEditMode = data !== null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      title: data?.title ?? "",
      author: data?.author ?? "",
      category: data?.category as PostFormData["category"] ?? undefined,
      content: data?.content ?? "",
    },
  });

  const onSubmit = async (formData: PostFormData) => {
    try {
      if (isEditMode) {
        await postService.update(data.id, formData);
        showSuccess("게시글이 수정되었습니다");
      } else {
        await postService.create({
          ...formData,
          content: formData.content ?? "",
          status: "draft",
        });
        showSuccess("게시글이 생성되었습니다");
      }
      await loadData();
      onCancel();
    } catch (error: any) {
      showError(error.message || "작업에 실패했습니다");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-body">
        {isEditMode && data && (
          <ManagementAlert
            message={`ID: ${data.id} | 생성일: ${data.createdAt} | 조회수: ${data.views}`}
            variant="info"
          />
        )}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              제목 <span className="text-destructive">*</span>
            </Label>
            <Input
              {...register("title")}
              placeholder="게시글 제목을 입력하세요"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">
                작성자 <span className="text-destructive">*</span>
              </Label>
              <Input {...register("author")} placeholder="작성자명" />
              {errors.author && (
                <p className="text-sm text-destructive">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                카테고리 <span className="text-destructive">*</span>
              </Label>
              <select
                {...register("category")}
                className={cn(
                  "border-input bg-transparent dark:bg-input/30 ring-offset-background focus:ring-ring flex h-9 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.category && "border-destructive"
                )}
              >
                <option value="">카테고리 선택</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="accessibility">Accessibility</option>
              </select>
              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              {...register("content")}
              placeholder="게시글 내용을 입력하세요"
              rows={6}
            />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "처리중..." : isEditMode ? "수정 완료" : "생성"}
        </Button>
      </div>
    </form>
  );
};
