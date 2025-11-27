import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Card 컴포넌트
 *
 * 콘텐츠를 담는 카드 컨테이너입니다.
 *
 * ### 디자인 토큰 확인
 * - `background`: --card
 * - `text`: --card-foreground
 * - `border`: --border
 */
const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 카드
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드에 대한 설명입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          카드 본문 내용이 들어갑니다.
        </p>
      </CardContent>
    </Card>
  ),
};

// 폼 카드
export const WithForm: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>계정 생성</CardTitle>
        <CardDescription>새 계정을 만들어보세요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input id="name" placeholder="홍길동" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">취소</Button>
        <Button>생성</Button>
      </CardFooter>
    </Card>
  ),
};

// 통계 카드 (ManagementStatCard 패턴)
export const StatCards: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-blue-50 border-blue-300 dark:bg-blue-900 dark:border-blue-700">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">전체</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">128</p>
        </CardContent>
      </Card>
      <Card className="bg-green-50 border-green-300 dark:bg-green-900 dark:border-green-700">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">활성</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-300">98</p>
        </CardContent>
      </Card>
      <Card className="bg-orange-50 border-orange-300 dark:bg-orange-900 dark:border-orange-700">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">비활성</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-300">20</p>
        </CardContent>
      </Card>
      <Card className="bg-red-50 border-red-300 dark:bg-red-900 dark:border-red-700">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">정지</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-300">10</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "ManagementStats에서 사용하는 통계 카드 패턴. 시맨틱 색상 + 다크모드.",
      },
    },
  },
};

// 액션 카드
export const WithActions: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>프로젝트 설정</CardTitle>
        <CardDescription>프로젝트 기본 설정을 변경합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          설정을 변경하면 모든 팀원에게 적용됩니다.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">취소</Button>
        <div className="flex gap-2">
          <Button variant="outline">초기화</Button>
          <Button>저장</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

// 다크모드 프리뷰
export const DarkModePreview: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        ↑ 상단 툴바의 Theme 토글로 다크모드 확인
      </p>
      <Card className="w-80">
        <CardHeader>
          <CardTitle>다크모드 테스트</CardTitle>
          <CardDescription>--card, --card-foreground 토큰 확인</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            배경색과 텍스트 색상이 자동으로 변경됩니다.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">확인</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

