import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { Mail, Plus, Trash2, Settings, ChevronRight } from "lucide-react";

/**
 * Button 컴포넌트
 *
 * CVA(Class Variance Authority)로 구현된 버튼 컴포넌트입니다.
 * 디자인 토큰(primary, destructive, secondary 등)을 활용합니다.
 *
 * ### 디자인 토큰 확인
 * - `default`: --primary, --primary-foreground
 * - `destructive`: --destructive
 * - `secondary`: --secondary, --secondary-foreground
 * - `outline/ghost`: --accent, --accent-foreground
 */
const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "버튼 스타일 variant (디자인 토큰 적용)",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
      description: "버튼 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    asChild: {
      control: "boolean",
      description: "자식 요소로 렌더링 (Radix Slot)",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};

// 모든 Variants - 디자인 토큰 확인용
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default (Primary)</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
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

// 모든 사이즈
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// 아이콘 버튼
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Mail />
        이메일 보내기
      </Button>
      <Button variant="destructive">
        <Trash2 />
        삭제하기
      </Button>
      <Button variant="outline">
        <Settings />
        설정
      </Button>
      <Button variant="secondary">
        다음
        <ChevronRight />
      </Button>
    </div>
  ),
};

// 아이콘만 있는 버튼
export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="icon-sm" variant="ghost">
        <Plus />
      </Button>
      <Button size="icon" variant="outline">
        <Settings />
      </Button>
      <Button size="icon-lg" variant="destructive">
        <Trash2 />
      </Button>
    </div>
  ),
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Default</Button>
      <Button variant="destructive" disabled>Destructive</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="secondary" disabled>Secondary</Button>
    </div>
  ),
};

// 다크모드 프리뷰 (테마 토글로 확인)
export const DarkModePreview: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        ↑ 상단 툴바의 Theme 토글로 다크모드 확인
      </p>
      <div className="flex flex-wrap gap-4">
        <Button variant="default">Primary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "다크모드에서 버튼 색상이 어떻게 변하는지 확인하세요. 상단 Theme 토글 사용.",
      },
    },
  },
};

