import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * 디자인 토큰 쇼케이스
 *
 * index.css에 정의된 CSS 변수들을 시각적으로 확인합니다.
 * 토큰 값을 변경하면 이 스토리에서 즉시 확인할 수 있습니다.
 *
 * ### 토큰 변경 방법
 * 1. src/index.css 열기
 * 2. :root 또는 .dark 섹션에서 값 수정
 * 3. Storybook에서 실시간 확인
 */
const meta: Meta = {
  title: "Design System/Tokens",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 색상 토큰
export const ColorTokens: Story = {
  render: () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold mb-4 text-foreground">기본 색상</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="background" className="bg-background" />
          <ColorSwatch name="foreground" className="bg-foreground" textDark />
          <ColorSwatch name="muted" className="bg-muted" />
          <ColorSwatch name="muted-foreground" className="bg-muted-foreground" textDark />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Primary / Secondary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="primary" className="bg-primary" textDark />
          <ColorSwatch name="primary-foreground" className="bg-primary-foreground" />
          <ColorSwatch name="secondary" className="bg-secondary" />
          <ColorSwatch name="secondary-foreground" className="bg-secondary-foreground" textDark />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Accent / Destructive</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="accent" className="bg-accent" />
          <ColorSwatch name="accent-foreground" className="bg-accent-foreground" textDark />
          <ColorSwatch name="destructive" className="bg-destructive" textDark />
          <ColorSwatch name="border" className="bg-border" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Card / Popover</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="card" className="bg-card" border />
          <ColorSwatch name="card-foreground" className="bg-card-foreground" textDark />
          <ColorSwatch name="popover" className="bg-popover" border />
          <ColorSwatch name="popover-foreground" className="bg-popover-foreground" textDark />
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "CSS 변수로 정의된 색상 토큰들. 다크모드 전환 시 값이 자동으로 변경됩니다.",
      },
    },
  },
};

// 시맨틱 색상 (상태 표시용)
export const SemanticColors: Story = {
  render: () => (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        상태 표시용 시맨틱 색상. dark: 변형이 적용됩니다.
      </p>

      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Success (Green)</h4>
        <div className="flex gap-2">
          <div className="px-4 py-2 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm">
            Light: green-100/800
          </div>
          <div className="px-4 py-2 rounded bg-green-50 border border-green-300 text-green-600 dark:bg-green-900 dark:border-green-700 dark:text-green-300 text-sm">
            Card Style
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Warning (Yellow)</h4>
        <div className="flex gap-2">
          <div className="px-4 py-2 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-sm">
            Light: yellow-100/800
          </div>
          <div className="px-4 py-2 rounded bg-yellow-50 border border-yellow-300 text-yellow-600 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-300 text-sm">
            Card Style
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Error (Red)</h4>
        <div className="flex gap-2">
          <div className="px-4 py-2 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-sm">
            Light: red-100/800
          </div>
          <div className="px-4 py-2 rounded bg-red-50 border border-red-300 text-red-600 dark:bg-red-900 dark:border-red-700 dark:text-red-300 text-sm">
            Card Style
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Info (Blue)</h4>
        <div className="flex gap-2">
          <div className="px-4 py-2 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm">
            Light: blue-100/800
          </div>
          <div className="px-4 py-2 rounded bg-blue-50 border border-blue-300 text-blue-600 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300 text-sm">
            Card Style
          </div>
        </div>
      </div>
    </div>
  ),
};

// Radius 토큰
export const RadiusTokens: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        --radius 변수로 전체 border-radius 조절 가능
      </p>
      <div className="flex items-end gap-4">
        <div className="w-16 h-16 bg-primary rounded-sm flex items-center justify-center text-primary-foreground text-xs">
          sm
        </div>
        <div className="w-16 h-16 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-xs">
          md
        </div>
        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs">
          lg
        </div>
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-primary-foreground text-xs">
          xl
        </div>
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
          full
        </div>
      </div>
    </div>
  ),
};

// Typography 프리뷰
export const Typography: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Heading 1 (text-4xl)</h1>
        <h2 className="text-3xl font-bold text-foreground">Heading 2 (text-3xl)</h2>
        <h3 className="text-2xl font-semibold text-foreground">Heading 3 (text-2xl)</h3>
        <h4 className="text-xl font-semibold text-foreground">Heading 4 (text-xl)</h4>
        <h5 className="text-lg font-medium text-foreground">Heading 5 (text-lg)</h5>
      </div>

      <div className="space-y-2">
        <p className="text-base text-foreground">Base text (text-base) - 기본 본문 텍스트</p>
        <p className="text-sm text-foreground">Small text (text-sm) - 작은 텍스트</p>
        <p className="text-xs text-foreground">Extra small (text-xs) - 아주 작은 텍스트</p>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground">Muted text - 보조 텍스트 (text-muted-foreground)</p>
        <p className="text-primary">Primary text - 강조 텍스트 (text-primary)</p>
        <p className="text-destructive">Destructive text - 에러 텍스트 (text-destructive)</p>
      </div>
    </div>
  ),
};

// 다크모드 비교
export const DarkModeComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        ↑ 상단 툴바의 Theme 토글로 라이트/다크 비교
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-card border border-border">
          <h4 className="font-medium text-card-foreground mb-2">Card</h4>
          <p className="text-sm text-muted-foreground">카드 배경과 텍스트</p>
        </div>

        <div className="p-4 rounded-lg bg-primary text-primary-foreground">
          <h4 className="font-medium mb-2">Primary</h4>
          <p className="text-sm opacity-80">Primary 배경과 텍스트</p>
        </div>

        <div className="p-4 rounded-lg bg-secondary text-secondary-foreground">
          <h4 className="font-medium mb-2">Secondary</h4>
          <p className="text-sm opacity-80">Secondary 배경과 텍스트</p>
        </div>

        <div className="p-4 rounded-lg bg-destructive text-white">
          <h4 className="font-medium mb-2">Destructive</h4>
          <p className="text-sm opacity-80">Destructive 배경과 텍스트</p>
        </div>
      </div>
    </div>
  ),
};

// Helper 컴포넌트
function ColorSwatch({
  name,
  className,
  textDark = false,
  border = false,
}: {
  name: string;
  className: string;
  textDark?: boolean;
  border?: boolean;
}) {
  return (
    <div
      className={`h-20 rounded-lg flex items-end p-2 ${className} ${
        border ? "border border-border" : ""
      }`}
    >
      <span className={`text-xs font-medium ${textDark ? "text-white" : "text-foreground"}`}>
        {name}
      </span>
    </div>
  );
}

