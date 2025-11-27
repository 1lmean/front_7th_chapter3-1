import { ThemeToggle } from "./ThemeToggle";

/**
 * Header - 애플리케이션 헤더 컴포넌트
 *
 * Tailwind CSS 기반으로 organisms/Header.tsx를 대체합니다.
 * 디자인 토큰(primary, muted 등)을 활용하여 일관된 스타일 적용
 */
export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground">
            L
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none text-foreground">
              Hanghae Company
            </h1>
            <p className="mt-0.5 text-xs leading-none text-muted-foreground">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info & Theme Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">
                Demo User
              </div>
              <div className="text-xs text-muted-foreground">
                demo@example.com
              </div>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
              DU
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

