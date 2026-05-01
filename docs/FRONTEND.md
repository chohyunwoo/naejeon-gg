# 프론트엔드 작업 프롬프트 템플릿

> React + TypeScript 코드 작성/수정 시 사용할 표준 프롬프트 템플릿.

## 사용 방식

1. 작업 종류에 맞는 템플릿 선택
2. `[대괄호]` 부분을 실제 내용으로 교체
3. Claude Code에 입력

---

## 프로젝트 디자인 시스템

모든 UI 작업은 아래 디자인 시스템을 준수.

### 컨셉
- **톤**: 라이트 모드, 웜 그레이 (오프화이트 베이스)
- **분위기**: 모던 SaaS, 깔끔하고 차분한 느낌 (Linear/Vercel/shadcn 톤)
- **게임 사용자 친화적이되 지나치게 게이밍하지 않음**

### 컬러 팔레트

```
base 컬러 (웜 그레이, 파일드·텍스트·보더에 사용):
  base-50:  #faf9f7  - 메인 배경 (가장 밝은 톤)
  base-100: #f4f2ee  - 섹션 배경 (시각적 리듬)
  base-200: #e8e5df  - 카드 보더
  base-300: #d4cfc6  - 접힌 보더, 디줄드
  base-400: #a8a298  - 텍스트 마컴
  base-500: #7a7468  - 쿼이어트 텍스트
  base-600: #5c5648  - 본문 텍스트
  base-700: #403a30  - 서브텍스트
  base-800: #2a261f  - 다크 이제원트
  base-900: #1a1813  - 메인 텍스트, 주요 버튼

brand 컬러 (액센트):
  brand-50:  #f5f3ff  - 아이콘 배경, CTA 배경
  brand-100: #ede9fe  - 아이콘 보더
  brand-500: #8b5cf6  - 그라디언트 시작
  brand-600: #7c3aed  - 서브타이틀 텍스트 (FEATURES 다음)
  brand-700: #6d28d9  - 호버

accent 컬러 (cyan):
  cyan-500: #06b6d4  - 그라디언트 끝
  cyan-50/100: 추가 카드 아이콘 배경
```

### 그라디언트

```css
/* 메인 그라디언트 텍스트 (제목 강조·수치) */
background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* 서브 아이콘 그라디언트 (로고·주요 아이콘) */
background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);

/* Hero 배경 그라디언트 (부드러운 안개) */
radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 50%),
radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.06) 0%, transparent 50%);
```

### 타이포그래피

- **폰트**: Pretendard (따뜻하고 임팔리티한 대로 갈 수 있는 한글 폰트)
- CDN: https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css
- letter-spacing은 제목·텍스트 기본값 그대로 (조정 불필요)

```
제목 계층:
  Hero h1: text-5xl md:text-6xl, font-bold, tracking-tight
  Section h2: text-3xl md:text-4xl, font-bold
  Card h3: text-lg, font-semibold
  Step h3: text-xl, font-semibold
  Feature 태그 (FEATURES 등): text-sm, font-semibold, brand-600

본문:
  Lead text: text-lg, leading-relaxed, base-600
  Card body: text-sm, leading-relaxed, base-600
  Caption: text-sm, base-500
  Tiny: text-xs, base-400 또는 base-500
```

### 스페이싱 및 레이아웃

```
컨테이너: max-w-7xl mx-auto px-6 (메인), max-w-4xl (좁은 CTA), max-w-2xl (텍스트 블록)
섹션 패딩: py-24, 필요 시 py-20
Nav 높이: h-16, 고정, backdrop-blur-xl
Nav 하이닉 넘기: pt-32 pb-20 (Hero 첫 섹션)
```

### 보더 라디어스

```
버튼: rounded-lg (8px)
카드: rounded-xl (12px), rounded-2xl (16px) 강조 시
CTA 박스: rounded-2xl (16px)
아이콘 박스: rounded-lg (8px)
롬고 박스: rounded-lg (8px)
배지·태그: rounded (4px) 또는 rounded-full

주의: rounded-3xl (24px)과 더 큰 라디어스는 이 프로젝트에서 쓰지 않음 (지나치게 캐주얼해짐)
```

### 그림자 및 효과

```
기본 그림자: shadow-sm (버튼, 롬고)
호버 그림자 (카드): box-shadow: 0 12px 32px -8px rgba(64,58,48,0.12)
호버 시 카드 이동: transform: translateY(-2px)
호버 시 보더 색상: rgba(139,92,246,0.3)
안개·그리드 배경: hero 섹션만, 일반 카드 섹션은 평평하게
트랜지션: transition: all 0.2s ease (과도하지 않게)
```

### 그리드 배경 (Hero 전용)

```css
.grid-bg {
  background-image:
    linear-gradient(rgba(64,58,48,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64,58,48,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%);
}
```

### 아이콘

- **라이브러리**: lucide-react (React) / Heroicons SVG (HTML)
- 크기: 일반 w-4 h-4 (16px), 카드 아이콘 w-5 h-5 (20px)
- stroke-width: 2 (기본)
- 색상: 카테고리별 다른 서브 색상 (brand/cyan/emerald/amber/pink/blue)

### 컴포넌트 패턴

#### 버튼

```
[Primary 어두운 버튼]
bg-base-900 text-base-50
px-6 py-3 (큰거) / px-4 py-2 (작은거)
rounded-lg, font-medium, shadow-sm
hover: bg-base-800

[Secondary 버튼]
border border-base-200 bg-base-50
text-base-700, font-medium
hover: bg-base-100

[텍스트 링크]
text-base-600 hover:text-base-900
```

#### 카드

```
p-6 (일반) / p-7 (여유) / p-8 (강조)
rounded-xl border border-base-200 bg-base-50
card-hover 클래스 적용
```

#### 배지 (적용 상태 표시 등)

```
px-2 py-1 rounded text-xs
성공: bg-emerald-50 text-emerald-700 border border-emerald-200
경고: bg-amber-50 text-amber-700 border border-amber-200
정보: bg-blue-50 text-blue-700 border border-blue-200
```

### 시각적 리듬 (섹션 배경 교차)

```
base-50 섹션 (메인) → base-100/60 섹션 (강조) → base-50 (다시 메인)
· Hero        : bg-base-50
· Features    : bg-base-100/60
· How it works: bg-base-50 (기본)
· Games       : bg-base-100/60
· CTA         : bg-base-50 (기본) + 그라디언트 박스
· Footer      : bg-base-100/60
섹션 경계: border-t border-base-200/60
```

### 시안 파일 참조

다음 결정은 메인 페이지 프로토타입 (`docs/design-prototypes/main.html`)에서 검증됨:

- 웜 그레이 베이스 (#faf9f7) 채택
- Pretendard 폰트 채택
- 보라+시안 그라디언트 액센트
- 12-16px 라디어스 (자연스러운 모드·명시적 차감)
- 섹션별 배경 교차로 리듬 생성

파일명: `main-warm.html`

### 적용 원칙

1. 모든 새 페이지·컴포넌트는 이 디자인 시스템 준수
2. 임의로 새 컬러·폰트·라디어스 도입 금지
3. 시스템에 없는 부분이 필요하면 **먼저 제안**해서 승인 받고 시스템에 추가 후 사용
4. shadcn/ui 컴포넌트도 이 컬러·라디어스에 맞게 오버라이드

---

## 공통 프림붙이기

```
[제약조건]
- 기존 로직은 절대 변경하지 마
- 명시한 파일·함수·라인만 수정해
- CLAUDE.md의 코딩 컨벤션 따르기
- 이 페이지의 "프로젝트 디자인 시스템" 준수 (base/brand 컬러, Pretendard, 12-16px 라디우스)
- TypeScript 엄격 모드
- 수정 후 제안 사항이 있으면 알려줘
```

---

## 1. 분석 프롬프트 (수정 전 필수)

```
[작업영역: auth/room/auction/automatch/match]
[대상파일: frontend/src/features/[영역]/...]

다음을 분석해줘:

1. 현재 구조 (파일과 컴포넌트 구성)
2. 상태 관리 방식 (TanStack Query / Zustand / useState)
3. API 호출 경로
4. 관련 타입 정의

코드 수정은 하지 말고 분석 결과만 리포트해줘.
```

---

## 2. 신규 페이지 구현 프롬프트

```
[작업영역: auth/room/auction/automatch/match]
[페이지명: 예) 회원가입 Step 1 페이지]
[경로: /signup/step1]

구현 요청:

1. UI 구성:
   - [폼 필드, 버튼, 메시지 등 나열]
2. API 연동:
   - [엔드포인트 명세]
3. 흐름:
   - [사용자 행동 → 결과]

관련 노션:
[API 명세 페이지 링크]

제약조건:

- React 18 + TypeScript (엄격 모드)
- TanStack Query: 서버 상태
- Zustand: 전역 클라이언트 상태
- useState: 로컬 컴포넌트 상태
- Tailwind CSS + shadcn/ui
- 폼 검증: 클라이언트 + 서버 둘 다
- 로딩 스테이트 처리 (Suspense 또는 isLoading)
- 에러 스테이트 처리 (Error Boundary 또는 isError)
- 접근성 (a11y) 고려 (label, aria-*, 키보드)

파일 구조:

frontend/src/features/[영역]/
├── pages/[페이지명]Page.tsx
├── components/
├── hooks/
├── api/
└── types/

구현 순서:

1. 타입 정의 (types/)
2. API 클라이언트 (api/)
3. 커스텀 훅 (hooks/) — TanStack Query
4. 자식 컴포넌트 (components/)
5. 페이지 (pages/)
6. 라우팅 등록

구현 후 다음을 알려줘:

- 생성·변경된 파일 목록
- 추가 고려 필요한 사항 (의문점·엣지 케이스)
```

---

## 3. 컴포넌트 수정 프롬프트

```
[작업영역: auth/room/auction/automatch/match]
[파일: frontend/src/features/[영역]/components/[컴포넌트].tsx]

수정 내용:
[구체적으로]

제약조건:

- Props 타입 명시적 (any 금지)
- 공통 컴포넌트는 frontend/src/components에
- shadcn/ui 우선 사용
- 접근성 고려
- 명세적 이름 (Acronym 피하고 풀어 더 사용)
```

---

## 4. WebSocket 연동 구현 프롬프트 (경매 영역)

```
[작업영역: auction]
[파일: frontend/src/features/auction/hooks/useAuctionWebSocket.ts]

구현 요청:

1. 구독 채널: /topic/room/{roomId}/auction
2. 메시지 타입: AUCTION_STARTED / BID_PLACED / ITEM_SOLD / ROUND_ENDED 등
3. 동작:
   - 메시지 수신 시 상태 업데이트
   - 카운트다운 클라이언트 시계 계산
   - 서버 시간 offset 적용

관련 노션:
WebSocket 메시지 명세: notion.so/352eaf1930698148b1c0fa55f7b892cb

제약조건:

- STOMP.js + SockJS
- 연결 끊김 시 Exponential Backoff 재연결
- 재연결 후 STATE_SYNC 메시지 요청
- 메시지 타입 별로 디스패치
- Zustand store에 경매 상태 저장
- 컴포넌트 언마운트 시 구독 해제
- TypeScript 타입 정의 (메시지 종류별 discriminated union)

구현 제안:

```typescript
interface AuctionMessage {
  type: 'AUCTION_STARTED' | 'BID_PLACED' | 'ITEM_SOLD' | ...;
  timestamp: string;
  data: ...;
}

function useAuctionWebSocket(roomId: number) {
  // STOMP 연결
  // 구독
  // 메시지 수신 → store 업데이트
  // 재연결 전략
}
```
```

---

## 5. API 클라이언트 설정 프롬프트

```
[작업: API 클라이언트 구성 또는 Interceptor 수정]
[파일: frontend/src/lib/api/]

요청:
[구체적 내용]

제약조건:

- Axios 기반
- baseURL 환경변수 (VITE_API_URL)
- Interceptor:
  - 요청: Authorization 헤더 추가 (메모리의 Access Token)
  - 응답: 401 시 Refresh Token 자동 갱신 → 원래 요청 재시도
  - 응답: 에러 표준화 (success: false → throw)
- TypeScript 반환값 타입 명시
- TanStack Query와 연결
```

---

## 6. 폼 구현 프롬프트

```
[작업영역: auth/room 등]
[폼명: 예) 로그인 폼 / 방 생성 폼]

입력 필드:
[필드 이름·타입·검증 규칙]

제약조건:

- React Hook Form + Zod (또는 yup)
- 서버의 Bean Validation 규칙과 일치하게 클라이언트 검증
- 실시간 피드백 (입력 중 에러 표시)
- 제출 시 서버 에러도 표시 (수동 설정)
- 로딩 중 버튼 비활성화
- 접근성 (label, aria-invalid, aria-describedby)
- 이메일·비밀번호·닉네임 등 업계 표준 규칙 적용
```

---

## 7. 상태 관리 (Zustand) 구현 프롬프트

```
[작업영역: auth/room/auction 등]
[Store 명: 예) authStore / auctionStore]

상태 구조:
[필드 설명]

액션:
[동작 설명]

제약조건:

- Zustand (devtools middleware 적용)
- TypeScript 타입 명시
- 액션 명: 동사 시작 (setUser, addBid, resetAuction 등)
- 임시 상태는 useState로 (Zustand는 필요한 때만)
- 서버 상태는 TanStack Query 우선, 클라이언트만 Zustand
```

---

## 8. 디자인 구현 프롬프트 (Tailwind + shadcn/ui)

```
[작업: 특정 UI 제작]
[자료: 디자인 시안 또는 참고 이미지]

구현 요청:
[구체적 설명]

제약조건:

- Tailwind CSS 우선 (인라인 스타일·CSS 파일 금지)
- shadcn/ui 컴포넌트 시자· (Button, Input, Dialog 등)
- 다크 모드 고려 (Phase 2)
- 모바일 반응형 (mobile-first)
- 접근성 (대비 비율, 포커스 상태)
- 애니메이션은 적절히 (과도 금지)
```

---

## 프롬프트 설계 원칙 (참고)

### TypeScript 엄격 모드

any 금지. 불가피한 경우 unknown 후 타입 가드.

```typescript
// X
function handle(data: any) { ... }

// O
function handle(data: unknown) {
  if (isAuctionMessage(data)) { ... }
}
```

### 컴포넌트 구성

- 상태 없으면 조광 함수
- 상태 있으면 함수 컴포넌트 + Hooks
- 클래스 컴포넌트 금지

### 등🔧릿 최소화

- DRY (Don't Repeat Yourself) 원칙
- 공통 로직은 hooks/ 또는 utils/로

## 관련 링크

- CLAUDE.md (이 파일 옆)
- BACKEND.md (이 파일 옆)
- 노션 AI 협업 가이드: notion.so/352eaf19306981008d9ccab63a2fceab
- 디자인 시안: docs/design-prototypes/main-warm.html
