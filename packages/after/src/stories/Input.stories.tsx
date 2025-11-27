import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

/**
 * Input 컴포넌트
 *
 * shadcn/ui 기반 입력 필드입니다.
 *
 * ### 디자인 토큰 확인
 * - `border`: --input
 * - `placeholder`: --muted-foreground
 * - `focus ring`: --ring
 * - `background`: --background
 */
const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "url"],
      description: "입력 타입",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 입력
export const Default: Story = {
  args: {
    placeholder: "입력하세요...",
  },
};

// 라벨과 함께
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">이메일</Label>
      <Input type="email" id="email" placeholder="email@example.com" />
    </div>
  ),
};

// 다양한 타입
export const InputTypes: Story = {
  render: () => (
    <div className="grid w-80 gap-4">
      <div className="space-y-1.5">
        <Label>텍스트</Label>
        <Input type="text" placeholder="일반 텍스트" />
      </div>
      <div className="space-y-1.5">
        <Label>이메일</Label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div className="space-y-1.5">
        <Label>비밀번호</Label>
        <Input type="password" placeholder="••••••••" />
      </div>
      <div className="space-y-1.5">
        <Label>숫자</Label>
        <Input type="number" placeholder="0" />
      </div>
    </div>
  ),
};

// 아이콘이 있는 입력
export const WithIcon: Story = {
  render: () => (
    <div className="grid w-80 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10" placeholder="검색..." />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10" type="email" placeholder="이메일 주소" />
      </div>
    </div>
  ),
};

// 비밀번호 토글
export const PasswordToggle: Story = {
  render: function PasswordToggleStory() {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative w-80">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10 pr-10"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "비활성화된 입력",
  },
};

// 에러 상태
export const WithError: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="error-input">이메일</Label>
      <Input
        id="error-input"
        type="email"
        placeholder="email@example.com"
        className="border-destructive focus-visible:ring-destructive"
        aria-invalid="true"
      />
      <p className="text-sm text-destructive">유효한 이메일을 입력하세요</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "에러 상태에서는 --destructive 토큰이 적용됩니다.",
      },
    },
  },
};

// 다크모드 프리뷰
export const DarkModePreview: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <p className="text-sm text-muted-foreground">
        ↑ 상단 툴바의 Theme 토글로 다크모드 확인
      </p>
      <Input placeholder="기본 입력" />
      <Input placeholder="비활성화" disabled />
      <Input
        placeholder="에러 상태"
        className="border-destructive"
      />
    </div>
  ),
};

