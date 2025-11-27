# Chapter3-1 주간 Q&A 정리

> 이번 주 진행한 질문과 작업 내용을 정리한 문서입니다.

---

## 1. 디자인 시스템 구축

### 1.1 TailwindCSS 디자인 토큰 적용

**Q: ManagementLayout.tsx에 TailwindCSS 디자인 토큰 적용해줘**

- 인라인 스타일을 Tailwind 클래스로 변환
- `style={{ maxWidth: "1200px" }}` → `className="max-w-6xl"`

**Q: className 패딩 옵션 안먹는데**

- `components.css`의 `* { margin:0; padding:0; }` 전역 리셋이 Tailwind 패딩을 덮어씀
- 해결: 해당 전역 리셋 제거

### 1.2 하드코딩 색상 제거

**Q: 하드코딩 색상 모두 수정해**

변환 규칙:
| 하드코딩 | 디자인 토큰 |
|----------|-------------|
| `bg-gray-50/100` | `bg-muted` |
| `bg-white` | `bg-card` |
| `text-gray-800` | `text-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `border-gray-*` | `border-border` |

시맨틱 색상 다크모드 대응:
```css
bg-green-100 dark:bg-green-900
text-green-800 dark:text-green-200
```

### 1.3 오픈소스 디자인 토큰

**Q: 해당 프로젝트에 적용할 수 있는 오픈소스 디자인 토큰 추천해줘**

추천 순위:
1. **Radix Colors** (가장 추천) - shadcn/ui와 같은 팀, 접근성 보장
2. **Open Props** - 색상, 타이포, 스페이싱, 애니메이션 포함
3. **Catppuccin** - 트렌디한 파스텔 테마

**Q: Radix Colors를 제일 추천하는 이유는?**

1. shadcn/ui와 같은 팀(Workos)이 만듦 → 설계 철학 동일
2. 모든 색상 조합 WCAG AA 접근성 충족
3. Light/Dark 페어로 제공 → 다크모드 "제대로" 설계됨
4. 1-12 스케일로 용도별 명확한 가이드

---

## 2. 컴포넌트 아키텍처

### 2.1 컴포넌트 분리

**Q: ManagementPage.tsx의 탭 부분을 ManagementTab으로 분리하고 싶은데 파일 위치 추천**

- Atomic Design 사용 안 하면 `templates/` 또는 `components/` 권장
- 최종: `pages/management/components/ManagementTab.tsx` (Feature-based 구조)

**Q: 새로 만들기 버튼 + ManagementAlert + 통계 부분을 묶어서 빼는 게 나을까?**

- 이름 후보: ManagementHeader → ManagementSummary → ManagementPanel
- 결론: props가 너무 많아질 수 있어 개별 컴포넌트로 분리 권장

### 2.2 디렉토리 구조

**Q: 현재 디렉토리 구조 너무 중구난방인 것 같은데 추천해봐**

Feature-based 구조로 정리:
```
pages/management/
├── ManagementPage.tsx
├── components/          # 도메인 UI
├── context/            # 상태 관리
├── hooks/              # Custom Hooks
└── schemas/            # Zod 스키마

components/
├── ui/                 # shadcn/ui
└── shared/             # 공통 컴포넌트
```

---

## 3. 상태 관리 (Context + Hooks)

### 3.1 Context 분리

**Q: hook을 useData와 useEntityType으로 나누는 게 낫지 않을까?**

분리 결과:
- `ManagementTabContext` + `useManagementTab` → entityType 관리
- `ManagementDataContext` + `useManagementData` → data 관리
- `ManagementAlertContext` + `useManagementAlert` → alert 관리

**Q: User, Post 두 종류 데이터에 대해 각각 context-hook을 팔 필요가 있을까?**

- 불필요: `entityType`에 따라 동적으로 로드하는 단일 context가 적합
- `ManagementDataContext`가 `useManagementTab`을 구독하여 자동 데이터 로드

### 3.2 오류 수정

**Q: 'userService' cannot be used as a value because it was imported using 'import type'**

```tsx
// Before
import type { User, userService } from "@/services/userService";

// After
import type { User } from "@/services/userService";
import { userService } from "@/services/userService";
```

**Q: ManagementStats에 entityType 변경될 때마다 값 변경되는 거 동작 안 함**

- `ManagementDataContext`에 `useEffect` 추가하여 `entityType` 변경 시 `loadData()` 호출

---

## 4. 폼 관리 (React Hook Form + Zod)

### 4.1 구현 방식

**Q: 유효성 검사 추가해야 하는데, zod 라이브러리를 사용해 볼지?**

권장: **React Hook Form + Zod 조합**
- RHF: 폼 상태 관리, 최소 리렌더링
- Zod: 타입 안전한 스키마 검증
- `@hookform/resolvers`로 연결

**Q: 리액트 훅폼에 컨트롤러만 사용하면 유효성 검사 구현 가능했던 것 같은데 zod 사용하는 이유가 뭐야?**

| RHF만 사용 | RHF + Zod |
|-----------|-----------|
| 규칙 직접 작성 | 스키마로 선언 |
| 타입 수동 정의 | `z.infer`로 자동 추론 |
| 검증 로직 분산 | 한 곳에서 관리 |

### 4.2 오류 수정

**Q: z.enum에서 에러나는 거 고쳐**

```tsx
// Before
z.enum(["admin", "user"], { errorMap: () => ({ message: "..." }) })

// After
z.enum(["admin", "user"], { message: "역할을 선택하세요" })
```

**Q: 사용자명 필드에 "d"만 치고 넘어갔는데 (onBlur) error가 표출 안 됨**

```tsx
const { ... } = useForm({
  resolver: zodResolver(userSchema),
  mode: "onBlur",  // ← 추가
});
```

### 4.3 폼 컴포넌트 설계

**Q: Mode나 selectedItem을 따로 받지 않고 data 타입을 User|null로 받아서 null이면 createMode?**

- ✅ 채택: `data: User | null` → null이면 create, 객체면 edit
- 코드 간소화 + 명확한 의미

**Q: 모달 UI와 폼 로직 분리: submit 버튼이 Modal에 있고 form 데이터가 Form에 있으면?**

검토한 패턴:
1. **Lift State Up** ✅ 채택 - 모달이 폼 데이터 관리
2. Form에 버튼 포함 - 중복 코드 발생
3. `useImperativeHandle` - 오버스펙

---

## 5. 다크모드 구현

### 5.1 기본 구현

**Q: 다크모드 구현하려면?**

필요한 파일:
- `ThemeContext.tsx` - 테마 상태 관리 + localStorage 저장
- `ThemeToggle.tsx` - 해/달 토글 버튼
- `App.tsx` - ThemeProvider 래핑
- `Header.tsx` - ThemeToggle 배치

### 5.2 CVA와의 관계

**Q: 다크모드 적용하려면 모든 컴포넌트에 CVA 있는 게 낫지 않아?**

**CVA와 Dark Mode는 별개!**
- CVA: variants 관리 (size, variant)
- Dark Mode: CSS 변수 전환

```tsx
// CVA 없어도 다크모드 작동
<div className="bg-background text-foreground">
```

### 5.3 문제 해결

**Q: 다크모드일 때 ManagementModal.tsx 배경색 라이트모드로 적용됨**

- 원인: `components.css`에 `background-color: #fff` 하드코딩
- 해결: `background-color: var(--card)`로 변경

---

## 6. Storybook

### 6.1 설정

**Q: 스토리북 사용법 알려줘**

주요 기능:
- **다크모드 토글**: 상단 툴바 Theme 아이콘
- **Props 조절**: Controls 탭에서 실시간 변경
- **Viewport**: 모바일/태블릿/데스크톱 전환

**Q: 디자인 바꾸고 스토리북 껐다 켜야 해?**

| 자동 반영 | 재시작 필요 |
|----------|------------|
| 컴포넌트 `.tsx` | `.storybook/main.ts` |
| 스토리 `.stories.tsx` | `.storybook/preview.ts` |
| CSS, 디자인 토큰 | 새 addon 설치 |

### 6.2 스토리 작성

**Q: stories/assets는 지워도 되는 거 아니니?**

- ✅ 모두 샘플 파일이라 삭제 가능
- 실제 스토리: `Button.stories.tsx`, `Input.stories.tsx`, `DesignTokens.stories.tsx` 등

**Q: 디자인 토큰 변경할지도 모르는데, 그거 고려해서 스토리 작성해줘**

- `DesignTokens.stories.tsx` 생성 → 모든 색상 토큰 시각화
- 각 스토리에 `DarkModePreview` 추가 → 다크모드 확인용

---

## 7. Alert 컴포넌트

### 7.1 variant 수정

**Q: ManagementAlert variant가 info인 경우 onClose 필요없고 x 버튼도 안 뜨고 배경색 파란색**

```tsx
const getAlertStyles = () => {
  if (isSuccess) return "border-green-500 bg-green-50 ...";
  if (isInfo) return "border-blue-500 bg-blue-50 ...";  // X 버튼 없음
  return "border-red-500 bg-red-50 ...";
};
```

**Q: Alert variant destructive일 때 빨간색 배경 적용해줘**

- 문제: `variant="destructive"`가 shadcn 기본 스타일과 충돌
- 해결: `variant="default"` + 빨간 배경 클래스 직접 적용

---

## 8. 기타

### 8.1 테이블

**Q: ManagementPage에서 table에 해당하는 비즈니스 로직 뭐가 있음?**

- 정렬, 검색, 페이지네이션
- 엔티티별 셀 렌더링 (Badge, 액션 버튼)
- `ManagementTable`로 분리하여 shadcn Table 사용

### 8.2 FormSelect 테스트 문제

**Q: FormSelect 옵션이 화면상에 안 보임**

- 원인: Radix UI Select가 `@testing-library/user-event`와 호환 안 됨
- 해결: 네이티브 `<select>` 요소로 변경

### 8.3 배포 설정

**Q: deploy.yml에서 현재 프로젝트랑 버전 안 맞는 부분 있나?**

문제점:
- `pnpm run build` → 모든 패키지 빌드
- `path: dist` → 루트에 dist 없음 (모노레포)

수정:
```yaml
- name: Build After Package
  run: pnpm run build:after
  
- name: Upload artifact
  with:
    path: packages/after/dist
```

---

## 9. useMemo 관련

**Q: useMemo 안 쓰고 useEffect 쓰면 나중에 데이터 추가됐을 때 문제 안 생김?**

| useEffect | useMemo |
|-----------|---------|
| 상태 업데이트 트리거 | 파생 데이터 계산 |
| 비동기 작업 | 동기적 메모이제이션 |

통계 계산은 `useMemo`가 적합 (순수 계산, 의존성 기반)

**Q: 메모이제이션 남발일 수 있지 않나?**

- 현재 데이터 규모(수십~수백 개)에서는 useMemo 없이도 충분
- 과도한 최적화보다는 측정 후 적용 권장
- 단, 주석으로 의도 명시

---

## 10. 모달 설계

**Q: 모달 컴포넌트 분리하는 것도 alert처럼 훅 사용하는 게 나을까?**

| 패턴 | 적합한 경우 |
|------|------------|
| Props 기반 (현재) | 단일 페이지에서만 사용 |
| useModal 훅 | 여러 페이지에서 동일 모달 |
| Modal Context | 전역 모달 관리, 모달 스택 |

현재 프로젝트: Props 기반이 적합 (ManagementPage에서만 사용)

---

## 커밋 컨벤션 관련 질문

- **COMMIT_CONVENTION.md 기준으로 커밋해줘** (여러 번)
- type(scope): subject 형식 준수
- 한글 사용, 명령형 ("구현", "수정", "추가")


