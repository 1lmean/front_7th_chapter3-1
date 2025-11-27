# Chapter3-1. UI 컴포넌트 모듈화와 디자인 시스템

## 배포링크

https://1lmean.github.io/front_7th_chapter3-1/

## 과제 목표

**레거시 코드베이스를 현대적인 디자인 시스템으로 개편하는 실무 경험**

1. 정리되지 않은 레거시 코드의 문제점 식별 및 분석
2. TailwindCSS, shadcn/ui, CVA 등의 현대 도구 활용
3. 일관된 디자인 토큰과 컴포넌트 API 구축
4. UI와 비즈니스 로직이 적절한 분리된 리팩토링

---

## Before 패키지 분석 후 After 패키지 개편

### 개편 목표

**디자인 시스템**

- TailwindCSS 기반 일관된 디자인 토큰 정의
- 하드코딩 제거, 재사용 가능한 스타일 시스템 구축
- dark mode, 반응형 등 확장 가능한 구조

**컴포넌트 아키텍처**

- UI 컴포넌트는 순수하게 UI만 담당
- 도메인 로직은 적절히 분리
- 일관된 컴포넌트 API 설계

### 사용할 도구

**TailwindCSS 4.x**

- 디자인 토큰 기반 스타일링
- 유틸리티 클래스 활용
- dark mode, 반응형 내장 지원

**shadcn/ui**

- Radix UI 기반, 접근성 내장
- 복사 가능한 컴포넌트 (라이브러리가 아닌 소스코드)
- 자유로운 커스터마이징

**CVA (Class Variance Authority)**

- 선언적 variants 패턴
- 타입 안전한 스타일 조합
- 조건부 스타일링 처리

**React Hook Form + Zod**

- 선언적 폼 검증
- 타입 안전한 스키마
- 최소 리렌더링 최적화

---

## 필수 과제

### 1. 디자인 시스템 구축

- [x] TailwindCSS 설정 및 디자인 토큰 정의
- [x] shadcn/ui 컴포넌트 설치 (Button, Input, Select, Card, Table, Alert, Badge 등)
- [x] CVA를 활용한 variants 패턴 적용
- [x] 일관된 스타일 시스템 구축

### 2. Before 패키지 분석

- [x] Before 패키지 실행 및 전체 코드 탐색
- [x] 스타일링, 컴포넌트 설계, 폼 관리 측면에서 문제점 파악
- [x] 개선이 필요한 부분과 그 이유 정리

### 3. 컴포넌트 개편

- [x] UI와 비즈니스 로직 분리
- [x] 순수한 UI 컴포넌트로 재구성
- [x] 일관된 컴포넌트 API 설계
- [x] 적절한 컴포넌트 구조 설계

---

## 심화 과제

- [x] Dark Mode 완전 지원 (CSS Variables + Tailwind)
- [x] Design Token 시스템 고도화 (Radix Colors 적용)
- [x] 뷰와 비즈니스로직이 분리되도록

---

## 과제 회고

### Before 패키지에서 발견한 문제점

#### 1. God Component 문제

- `ManagementPage` 하나가 데이터 로딩, CRUD 로직, 통계 계산, 전체 UI 렌더링을 모두 담당
- UI, 도메인 로직, 상태 관리가 한 파일에 섞여 있어 읽기/수정/테스트가 어려움
- 재사용이 불가능한 구조

#### 2. 스타일링 문제

- **인라인 스타일 범람**: 레이아웃, 카드, 탭 버튼, 통계 카드 등 거의 모든 UI가 `style={{ ... }}`로 작성
- **하드코딩 색상**: `#1976d2`, `#e3f2fd`, `#e8f5e9` 같은 값이 직접 박혀 있어 테마 변경/다크모드 대응 불가
- **반복 패턴 미추출**: 통계 카드 4개, 탭 구조 등이 복붙 패턴으로 반복

#### 3. 폼 상태 관리 문제

- `formData`를 `useState<any>`로 선언하고 필드 이름을 문자열로 직접 매칭
- 타입 안전성 없음, 유효성 검증/에러 처리가 분산되어 있음
- 서비스 호출 결과에 따라 Alert/Modal 상태를 직접 토글하는 등 비즈니스 로직과 뷰 상태가 강하게 결합

#### 4. 도메인(user/post) 로직 혼재

- `entityType`에 따라 user/post 처리 로직이 if/else로 곳곳에 분기
- 컬럼 정의, 폼 필드, 통계 계산이 한 컴포넌트에 뒤섞여 있음

#### 5. 매직 스트링 사용

- 상태 값(`"active"`, `"inactive"`, `"published"` 등)이 문자열로 곳곳에 흩어져 있음
- enum/타입으로 관리되지 않아 오타/변경에 취약

---

### 개편 과정에서 집중한 부분

#### 1. 디자인 시스템 구축

**Radix Colors 기반 디자인 토큰**

```css
/* 접근성 검증된 색상 팔레트 */
--primary: var(--blue-9);
--destructive: var(--red-9);
--muted: var(--slate-3);
--border: var(--slate-6);
```

**하드코딩 → 디자인 토큰 변환**
| Before | After |
|--------|-------|
| `bg-gray-100` | `bg-muted` |
| `text-gray-800` | `text-foreground` |
| `border-gray-300` | `border-border` |

#### 2. 컴포넌트 아키텍처 개편

**Feature-based 디렉토리 구조**

```
pages/management/
├── ManagementPage.tsx      # 페이지 (조합만 담당)
├── components/             # 도메인 UI 컴포넌트
│   ├── ManagementTab.tsx
│   ├── ManagementStats.tsx
│   ├── ManagementTable.tsx
│   ├── ManagementModal.tsx
│   ├── UserForm.tsx
│   └── PostForm.tsx
├── context/                # 상태 관리
│   ├── ManagementTabContext.tsx
│   ├── ManagementDataContext.tsx
│   └── ManagementAlertContext.tsx
├── hooks/                  # Custom Hooks
│   ├── useManagementTab.ts
│   ├── useManagementData.ts
│   └── useManagementAlert.ts
└── schemas/                # Zod 스키마
    ├── userSchema.ts
    └── postSchema.ts
```

#### 3. Context + Hooks 패턴으로 상태 관리

**Before: Prop Drilling**

```tsx
<ManagementStats entityType={entityType} data={data} />
```

**After: Context + Hook**

```tsx
// ManagementStats 내부
const { entityType } = useManagementTab();
const { data } = useManagementData();
```

#### 4. React Hook Form + Zod 폼 검증

```tsx
const userSchema = z.object({
  username: z.string().min(2, "사용자명은 2자 이상"),
  email: z.string().email("유효한 이메일 주소를 입력하세요"),
  role: z.enum(["admin", "moderator", "user"]),
  status: z.enum(["active", "inactive", "suspended"]),
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(userSchema),
  mode: "onBlur",
});
```

---

### 사용한 기술 스택 경험

| 기술                | 활용 내용                                      |
| ------------------- | ---------------------------------------------- |
| **TailwindCSS v4**  | CSS 변수 기반 디자인 토큰, 다크모드 지원       |
| **shadcn/ui**       | Button, Input, Table, Alert, Badge 등 컴포넌트 |
| **CVA**             | Button, Badge, Alert의 variants 패턴           |
| **Radix Colors**    | WCAG AA 충족하는 접근성 검증 색상 팔레트       |
| **React Hook Form** | 폼 상태 관리, 최소 리렌더링                    |
| **Zod**             | 타입 안전한 스키마 검증                        |
| **Storybook**       | 디자인 토큰 시각화, 컴포넌트 문서화            |

---

### 어려웠던 점과 해결 방법

#### 1. 다크모드에서 시맨틱 색상 처리

**문제**: success/error/info 같은 시맨틱 색상은 단순히 변수로 바꾸면 안 됨  
**해결**: `dark:` 변형 클래스를 명시적으로 추가

```tsx
className = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
```

#### 2. FormSelect 테스트 호환성

**문제**: Radix UI Select가 `@testing-library/user-event`의 `selectOptions`와 호환되지 않음  
**해결**: 네이티브 `<select>` 요소 사용으로 변경 (테스트 호환성 + 모바일 접근성)

#### 3. Modal 배경색 다크모드 미적용

**문제**: `components.css`의 Modal 스타일이 `#fff` 하드코딩  
**해결**: CSS 변수로 교체 (`background-color: var(--card)`)

#### 4. Context 의존성 순서

**문제**: `ManagementDataContext`가 `useManagementTab`에 의존하여 Provider 순서 중요  
**해결**: Provider 중첩 순서를 명확히 하고 주석으로 문서화

---

### 리뷰받고 싶거나 질문하고 싶은 내용

1. **Context vs Zustand**: 현재 프로젝트 규모에서는 Context + Hooks로 충분했지만, 규모가 커지면 Zustand 같은 상태 관리 라이브러리 도입이 필요할까요?

2. **시맨틱 색상 토큰화**: success/error/info 색상을 현재는 Tailwind 클래스로 직접 사용하는데, CSS 변수로 별도 정의하는 것이 더 나을까요?

3. **폼 컴포넌트 재사용**: `UserForm`과 `PostForm`에 공통되는 패턴이 있는데, 더 추상화할 수 있는 방법이 있을까요?

4. **Storybook 활용도**: 현재 디자인 토큰 확인용으로 주로 사용하는데, 실무에서는 어떤 방식으로 더 활용하나요?

---

## 주요 변경 파일

### 디자인 시스템

- `src/index.css` - Radix Colors 기반 디자인 토큰
- `src/components/ui/*` - shadcn/ui 컴포넌트
- `src/context/ThemeContext.tsx` - 다크모드 상태 관리

### 컴포넌트 아키텍처

- `src/pages/management/` - Feature-based 구조
- `src/components/shared/` - 공통 컴포넌트

### Storybook

- `src/stories/` - UI 컴포넌트 스토리
- `.storybook/preview.ts` - 다크모드 토글 설정
