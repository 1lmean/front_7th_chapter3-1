// src/pages/management/components/UserForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormData } from "../schemas/userSchema";
import type { User } from "@/services/userService";
import { useManagementData } from "../hooks/useManagementData";
import { useManagementAlert } from "../hooks/useManagementAlert";
import { userService } from "@/services/userService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserFormProps {
  data: User | null;
  onCancel: () => void;
}

export const UserForm = ({ data, onCancel }: UserFormProps) => {
  const { loadData } = useManagementData();
  const { showSuccess, showError } = useManagementAlert();
  const isEditMode = data !== null;

  // 1️⃣ useForm 훅 설정
  const {
    register, // input 연결
    handleSubmit, // 폼 제출 핸들러
    formState: { errors, isSubmitting }, // 에러 상태
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema), // Zod 연결
    mode: "onChange",
    defaultValues: {
      username: data?.username ?? "",
      email: data?.email ?? "",
      role: data?.role ?? "user",
      status: data?.status ?? "active",
    },
  });

  // 2️⃣ 폼 제출 핸들러
  const onSubmit = async (formData: UserFormData) => {
    try {
      if (isEditMode) {
        await userService.update(data.id, formData);
        showSuccess("사용자가 수정되었습니다");
      } else {
        await userService.create(formData);
        showSuccess("사용자가 생성되었습니다");
      }
      await loadData();
      onCancel();
    } catch (error: any) {
      showError(error.message || "작업에 실패했습니다");
    }
  };

  return (
    // 3️⃣ handleSubmit으로 감싸기
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-body">
        <div className="space-y-4">
          {/* 4️⃣ register로 input 연결 */}
          <div className="space-y-2">
            <Label htmlFor="username">
              사용자명 <span className="text-destructive">*</span>
            </Label>
            <Input
              {...register("username")}
              placeholder="사용자명을 입력하세요"
            />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              이메일 <span className="text-destructive">*</span>
            </Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="이메일을 입력하세요"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">역할</Label>
              <select
                {...register("role")}
                className={cn(
                  "border-input bg-background ring-offset-background focus:ring-ring flex h-9 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.role && "border-destructive"
                )}
              >
                <option value="user">사용자</option>
                <option value="moderator">운영자</option>
                <option value="admin">관리자</option>
              </select>
              {errors.role && (
                <p className="text-sm text-destructive">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">상태</Label>
              <select
                {...register("status")}
                className="border-input bg-background ring-offset-background focus:ring-ring flex h-9 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
                <option value="suspended">정지</option>
              </select>
            </div>
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
