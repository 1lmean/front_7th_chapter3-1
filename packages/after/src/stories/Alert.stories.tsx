import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CircleCheck, CircleX, Info, AlertTriangle } from "lucide-react";

/**
 * Alert 컴포넌트
 *
 * CVA로 구현된 알림 컴포넌트입니다.
 *
 * ### 디자인 토큰 확인
 * - `default`: --background, --foreground
 * - `destructive`: --destructive
 */
const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "알림 스타일 (디자인 토큰 적용)",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 알림
export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Info className="h-4 w-4" />
      <AlertTitle>알림</AlertTitle>
      <AlertDescription>
        기본 알림 메시지입니다.
      </AlertDescription>
    </Alert>
  ),
};

// Destructive 알림
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <CircleX className="h-4 w-4" />
      <AlertTitle>오류</AlertTitle>
      <AlertDescription>
        작업 중 오류가 발생했습니다.
      </AlertDescription>
    </Alert>
  ),
};

// 모든 타입 - 프로젝트에서 사용하는 패턴
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      {/* 성공 */}
      <Alert className="border-green-500 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200 dark:border-green-800">
        <CircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle>성공</AlertTitle>
        <AlertDescription>
          작업이 완료되었습니다.
        </AlertDescription>
      </Alert>

      {/* 정보 */}
      <Alert className="border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle>정보</AlertTitle>
        <AlertDescription>
          참고할 정보입니다.
        </AlertDescription>
      </Alert>

      {/* 경고 */}
      <Alert className="border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800">
        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        <AlertTitle>경고</AlertTitle>
        <AlertDescription>
          주의가 필요합니다.
        </AlertDescription>
      </Alert>

      {/* 오류 */}
      <Alert variant="destructive">
        <CircleX className="h-4 w-4" />
        <AlertTitle>오류</AlertTitle>
        <AlertDescription>
          문제가 발생했습니다.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "성공(green), 정보(blue), 경고(yellow), 오류(destructive) 알림 패턴",
      },
    },
  },
};

// ManagementAlert 패턴
export const ManagementAlertPattern: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <p className="text-sm text-muted-foreground mb-2">
        ManagementPage에서 사용하는 Alert 패턴
      </p>

      {/* 성공 알림 */}
      <Alert className="border-green-500 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200 dark:border-green-800">
        <CircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle>성공</AlertTitle>
        <AlertDescription>저장되었습니다</AlertDescription>
      </Alert>

      {/* 정보 알림 (폼 수정 시) */}
      <Alert className="border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle>정보</AlertTitle>
        <AlertDescription>ID: 1 | 생성일: 2024-01-01</AlertDescription>
      </Alert>

      {/* 오류 알림 */}
      <Alert variant="destructive">
        <CircleX className="h-4 w-4" />
        <AlertTitle>오류</AlertTitle>
        <AlertDescription>삭제에 실패했습니다</AlertDescription>
      </Alert>
    </div>
  ),
};

// 다크모드 프리뷰
export const DarkModePreview: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <p className="text-sm text-muted-foreground">
        ↑ 상단 툴바의 Theme 토글로 다크모드 확인
      </p>
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>기본 알림</AlertTitle>
        <AlertDescription>다크모드에서 배경색이 변경됩니다.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleX className="h-4 w-4" />
        <AlertTitle>오류 알림</AlertTitle>
        <AlertDescription>destructive 토큰이 적용됩니다.</AlertDescription>
      </Alert>
    </div>
  ),
};

