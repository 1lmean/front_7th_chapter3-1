import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(2, "제목은 2자 이상이어야 합니다")
    .max(100, "제목은 100자 이하여야 합니다"),

  author: z
    .string()
    .min(2, "작성자명은 2자 이상이어야 합니다"),

  category: z.enum(["development", "design", "accessibility"], {
    message: "카테고리를 선택하세요",
  }),

  content: z.string().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;

