// src/pages/management/schemas/userSchema.ts
import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(2, "사용자명은 2자 이상이어야 합니다")
    .max(20, "사용자명은 20자 이하여야 합니다"),

  email: z.string().email("유효한 이메일 주소를 입력하세요"),

  role: z.enum(["admin", "moderator", "user"], {
    message: "역할을 선택하세요",
  }),

  status: z.enum(["active", "inactive", "suspended"], {
    message: "상태를 선택하세요",
  }),
});

// 타입 자동 추론!
export type UserFormData = z.infer<typeof userSchema>;
