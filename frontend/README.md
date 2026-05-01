# 내전.gg Frontend

내전.gg 서비스의 React + TypeScript 프론트엔드.

## 기술 스택

- **빌드**: Vite 6 + React 18 + TypeScript 5.7 (strict)
- **라우팅**: React Router v6
- **상태 관리**: TanStack Query (서버 상태) + Zustand (전역 클라이언트 상태)
- **스타일**: Tailwind CSS 3 + shadcn/ui (new-york style, stone base)
- **HTTP**: Axios
- **폰트**: Pretendard (CDN)
- **린트/포맷**: ESLint flat config + Prettier
- **패키지 매니저**: pnpm (`packageManager` 필드로 버전 고정)

## 사전 요구 사항

- Node.js 20+ (권장 22)
- pnpm — Corepack 사용 권장:
  ```sh
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

## 실행 명령어

```sh
# 의존성 설치
pnpm install

# 개발 서버 (http://localhost:5173)
pnpm dev

# 타입 체크 + 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview

# 린트
pnpm lint

# 포맷
pnpm format
pnpm format:check
```

개발 서버는 `/api` 경로를 백엔드(`http://localhost:8080`)로 프록시한다.
백엔드를 같이 띄우려면 프로젝트 루트에서 `docker compose up -d` 후 `cd backend && ./gradlew bootRun`.

## 환경 변수

`.env.development` (로컬 기본값):

```
VITE_API_URL=
```

빈 문자열이면 동일 origin으로 요청하므로 Vite proxy가 `/api`를 백엔드로 포워딩한다.
프로덕션 빌드 시점에 실제 백엔드 URL로 교체.

`.env.example`을 참고해서 `.env.local`을 만들면 git에서 제외된다.

## 폴더 구조

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   └── ui/            # shadcn/ui 생성물 (Button, Input, Label)
│   ├── features/          # 도메인별 (auth/room/auction/...) — Step 2 이후 추가
│   ├── hooks/             # 공통 훅 (useHealthCheck 등)
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts  # axios 인스턴스 (apiClient + healthClient)
│   │   │   └── types.ts   # ApiResponse / ApiError
│   │   ├── query.ts       # TanStack QueryClient
│   │   └── utils.ts       # cn() 등
│   ├── pages/             # 라우트 진입 페이지
│   ├── styles/
│   │   └── globals.css    # Tailwind + 디자인 토큰
│   ├── App.tsx            # 라우터 루트
│   └── main.tsx           # Provider 마운트
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── components.json        # shadcn/ui 설정
```

## API 클라이언트 사용

- **`apiClient`** (`src/lib/api/client.ts`): 표준 백엔드 API용. 응답 인터셉터가 `ApiResponse<T>` 래퍼를 풀고, 실패 시 `ApiError` throw.
- **`healthClient`**: 헬스체크 등 raw 응답 엔드포인트용. 인터셉터 미적용.

```ts
import { apiClient } from '@/lib/api/client';
import { ApiError } from '@/lib/api/types';

try {
  const user = await apiClient.get<UserResponse>('/api/users/me');
  // user.data 는 unwrap된 UserResponse
} catch (e) {
  if (e instanceof ApiError) {
    // e.code, e.message, e.fieldErrors
  }
}
```

## 디자인 시스템

`docs/FRONTEND.md`의 디자인 시스템을 따른다 (웜 그레이 base, 보라+시안 그라디언트, Pretendard, 12-16px 라디우스).
컬러 토큰은 `tailwind.config.ts`의 `theme.extend.colors`에서 관리.
임의로 새 컬러/폰트/라디우스 도입 금지 — 시스템에 없는 부분은 먼저 제안 후 추가.

## 컨벤션

- TypeScript strict 모드, `any` 금지
- 절대 경로 alias: `@/*` → `src/*`
- 컴포넌트 이름은 풀어 쓰기 (acronym 지양)
- 공통 컴포넌트는 `src/components/`, 도메인별은 `src/features/{domain}/`
- 자세한 작업 가이드라인: 루트 `CLAUDE.md`, `docs/FRONTEND.md`
