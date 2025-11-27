import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";

/**
 * Badge 컴포넌트
 *
 * CVA로 구현된 뱃지 컴포넌트입니다.
 *
 * ### 디자인 토큰 확인
 * - `default`: --primary, --primary-foreground
 * - `secondary`: --secondary, --secondary-foreground
 * - `destructive`: --destructive
 * - `outline`: --foreground, border
 */
const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "뱃지 스타일 (디자인 토큰 적용)",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 뱃지
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

// 모든 Variants - 디자인 토큰 확인용
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 variant를 한눈에 확인. 디자인 토큰 변경 시 여기서 확인하세요.",
      },
    },
  },
};

// 상태 뱃지 예시
export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2 text-foreground">사용자 상태</h4>
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200">
            활성
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200">
            비활성
          </Badge>
          <Badge className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200">
            정지
          </Badge>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2 text-foreground">게시글 상태</h4>
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200">
            게시됨
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200">
            임시저장
          </Badge>
          <Badge className="bg-muted text-muted-foreground border-border">
            보관됨
          </Badge>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2 text-foreground">역할</h4>
        <div className="flex gap-2">
          <Badge className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200">
            관리자
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200">
            운영자
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200">
            사용자
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "실제 프로젝트에서 사용되는 상태 뱃지들. 시맨틱 색상 + 다크모드 대응.",
      },
    },
  },
};

// 카테고리 뱃지
export const CategoryBadges: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200">
        development
      </Badge>
      <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200">
        design
      </Badge>
      <Badge className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200">
        accessibility
      </Badge>
    </div>
  ),
};

// 다크모드 프리뷰
export const DarkModePreview: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        ↑ 상단 툴바의 Theme 토글로 다크모드 확인
      </p>
      <div className="flex flex-wrap gap-3">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </div>
  ),
};

