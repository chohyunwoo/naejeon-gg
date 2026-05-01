# 내전 플랫폼 프로젝트

## 프로젝트 정체성

내전을 즐기기 좋게 만드는 서비스. SOOP/치지직 보완 도구로, 시청은 외부에서, 우리는 내전 진행 도구만.

- **타겟**: 실제 내전 참여자 (스트리머 + 팀장 + 플레이어)
- **초기 게임**: 롤 (LoL), 오버워치
- **개발 방식**: 1인 개발 + AI 협업

## 기술 스택

### 백엔드
- Java 17 + Spring Boot 4.0.x
- Spring Data JPA, Spring Security, Spring WebSocket (STOMP), Validation
- PostgreSQL 15 + Redis 7
- Cloudflare R2 (스토리지)
- JWT (Access 30분 + Refresh 14일)
- Flyway (DB 마이그레이션)

### 프론트엔드
- React 18 + TypeScript + Vite
- TanStack Query + Zustand
- Tailwind CSS + shadcn/ui
- STOMP.js + SockJS

### 인프라
- AWS (배포 예정)
- GitHub Actions (CI/CD, 추후 구축)

## 프로젝트 구조

```
naejeon-gg/
├── backend/                    # Spring Boot
│   ├── build.gradle
│   └── src/
│       ├── main/java/com/naejeon/
│       │   ├── BackendApplication.java
│       │   ├── common/         # 공통 유틸, 예외, 응답 포맷
│       │   ├── auth/           # 인증/사용자 관리
│       │   ├── room/           # 방 관리
│       │   ├── auction/        # 경매 시스템
│       │   ├── automatch/      # 자동 팀 배정
│       │   ├── match/          # 결과 확정
│       │   └── point/          # 포인트 시스템
│       ├── main/resources/
│       │   ├── application.yml
│       │   └── db/migration/   # Flyway
│       └── test/
├── frontend/                   # React + Vite (예정)
├── docs/                       # 추가 문서
├── docker-compose.yml          # PostgreSQL + Redis
├── BACKEND.md                  # 백엔드 작업 가이드
├── FRONTEND.md                 # 프론트엔드 작업 가이드
└── CLAUDE.md                   # 이 파일
```

## 코딩 컨벤션

### 네이밍
- 도메인별 패키지 구조 (auth/, room/, auction/, automatch/, match/, point/)
- 클래스: PascalCase
- 메서드/변수: camelCase
- 상수: UPPER_SNAKE_CASE
- DB 컬럼/테이블: snake_case
- DB 테이블명: 복수형 (users, rooms, matches)
- DB id PK, xxx_id FK

### 레이어 구조
```
Controller → Service → Repository
  ↓           ↓           ↓
  DTO       Domain      Entity
```

- Controller: 요청/응답 처리, 검증 (@Valid)
- Service: 비즈니스 로직, 트랜잭션
- Repository: DB 접근
- DTO: API 계층
- Domain: JPA 엔티티

## 작업 흐름 규칙 (TDD-like)

### 확인 → 수정 두 단계

```
[1단계] 분석/확인 요청
"X 영역의 현재 구조를 분석해줘"
→ AI 분석 결과 보고 방향 확정

[2단계] 수정 요청
"위 분석을 바탕으로 Y 부분만 수정해줘"
→ AI가 명확한 범위로 수정
```

바로 수정 요청 X. 항상 분석 먼저.

### 기존 로직 보호

모든 수정 작업 시:
> **"기존 로직은 절대 변경하지 마. 명시한 부분만 수정해."**

### 정확한 위치 지정

- 파일 경로: `backend/src/main/java/com/naejeon/auth/service/AuthService.java`
- 함수명: `signup()`
- 줄 번호 (가능하면): `45~67줄`

## Git 및 커밋 규칙

### 브랜치 전략
- `main`: 운영 반영 설정 브랜치 (Phase A 끝난 후 배포)
- `develop`: 개발 통합 브랜치
- `feature/<영역>-<설명>`: 기능 개발 브랜치 (예: `feature/auth-signup`)

### 커밋 메시지 (Conventional Commits)
- `feat`: 새 기능
- `fix`: 버그 수정
- `test`: 테스트 추가/수정
- `docs`: 문서 변경
- `refactor`: 리팩토링
- `chore`: 설정/환경 변경

예시:
```
feat(auth): 이메일 인증 코드 발송 API 추가
fix(auction): 동시 입찰 시 가격 판정 버그 수정
test(point): 일일 상한 계산 테스트 추가
```

## 테스트 원칙

### TDD 적용 영역 (테스트 먼저)
- 경매 동시성 처리 (auction 도메인)
- 포인트 지급 + 일일 상한 (point 도메인)
- 자동 매칭 알고리즘 (automatch 도메인)
- JWT 토큰 발급/검증 (auth 도메인)
- 24시간 신고 시간 제한 (match 도메인)

### Test-After (코드 먼저)
- 단순 CRUD
- DTO 변환
- 컨트롤러 라우팅

### 테스트 도구
- JUnit 5
- AssertJ
- Mockito
- TestContainers (PostgreSQL + Redis, 실제 환경)
- MockMvc / RestAssured

### 커버리지 목표
- 전체: 60-70%
- 핵심 비즈니스 로직: 90%+
- CRUD/단순 코드: 자유

## 보안 원칙

### 비밀번호 처리
- BCrypt 해싱
- Cost factor: 12
- 평문 로깅 금지

### JWT
- Access Token: 30분, 메모리에만 저장 (클라이언트)
- Refresh Token: 14일, HttpOnly Cookie + DB 해시 저장
- 비밀번호 변경 시 모든 Refresh Token 무효화

### 민감 정보 로깅 금지
- 비밀번호, 토큰, 신용카드 절대 로깅 X
- 이메일은 마스킹 (`hong****@gmail.com`)
- 프로덕션 로그는 INFO 레벨

### CSRF 방지
- Authorization 헤더 기반 (Access Token) → CSRF 토큰 불필요 (헤더는 타사이트에서 자동 첨부 안 됨)
- HttpOnly Cookie 기반 (Refresh Token) → SameSite=Strict + Origin 검증 (Phase 4 적용 예정)
- 세션/쿠키 기반이 아니므로 전통적 CSRF 토큰은 도입하지 않음

### Rate Limiting
- 이메일별: 5회/30분 (로그인 부르트포스)
- IP별: 10회/1시간

## API 원칙

### 응답 포맷
```json
[성공]
{
  "success": true,
  "data": { ... }
}

[실패]
{
  "success": false,
  "error": {
    "code": "U001",
    "message": "사용자를 찾을 수 없습니다"
  }
}
```

### 예외 처리
- `BusinessException` + `ErrorCode` enum
- `@RestControllerAdvice` 로 글로벌 핸들러
- HTTP 상태 코드 + 도메인 에러 코드 조합

### 검증
- Jakarta Validation (`@Valid`, `@NotBlank`, `@Size` 등)
- 검증 실패 → `400 Bad Request` + 필드명

## 로깅 원칙

### 레벨
- DEBUG: 개발
- INFO: 운영 (기본)
- WARN: 주의 필요 사항 (이메일 중복 등)
- ERROR: 예외 발생

### 포맷
- 시간 + 레벨 + traceId + 클래스 + 메시지
- traceId: 요청마다 UUID, MDC에 저장

## 자주 참조하는 노션 문서

- 기획 정리: notion.so/347eaf19306981b78fedffc8d006ff59
- 기술 스택: notion.so/349eaf19306981eb89bfccece3ef4e43
- 기능별 기술 매핑: notion.so/34aeaf1930698171998afec0a0e56bf9
- 리팩토링 백로그: notion.so/352eaf193069813e932ffef5e881bc6a
- 기술 용어 정리: notion.so/34aeaf1930698116a93bcdf565053451
- 타임아웃 정책: notion.so/352eaf193069814891f1e5993f502732

## 영역별 주요 결정 사항

### 인증 (auth)
- 회원가입 3단계 (이메일 인증 → 닉네임 → 게임 프로필 최소 1개)
- 개인정보 최소화 (출생 연도만)
- 게임 프로필: 자유 수정 + 내전 중 불가 + 24시간 쿨다운 + 이력 기록

### 방 관리 (room)
- 방 상태 5단계: CREATED → AUCTION_IN_PROGRESS → AUCTION_COMPLETED → IN_GAME → FINISHED → ARCHIVED
- 방장 부재 시 다층 처리 (1h → 6h → 24h)

### 경매 (auction)
- 영국식 + 시간 리셋
- 20초 카운트다운 + 5초 보호
- 동시 입찰: 방 단위 단일 스레드 처리
- WebSocket + STOMP
- 라운드 분리 (포지션별)

### 자동 매칭 (automatch)
- 균형 맞으면 포지션별 무작위
- 균형 안 맞으면 사람만 무작위 (자동 분기)
- 무제한 재배정 + 방장 단독 확정

### 결과 확정 (match)
- 시리즈 1번 신고 (BO3 끝나고)
- 24시간 내 신고
- 분쟁 시 관리자 처리 (Phase 2 AI 자동화)

### 포인트 (point)
- 3종 재화 (경매 P / 꾸미기 P / 꾸미기 캐시)
- 일일 상한 200P
- 단판 50/15, BO3 100/30

## 환경 세팅

### 로컬 DB (Docker)
```bash
# 실행
docker compose up -d

# 정지
docker compose down

# 로그
docker compose logs -f
```

### 백엔드 실행
- IntelliJ에서 `BackendApplication.java` 녹색 ▶
- 또는 `cd backend && ./gradlew bootRun`

### 헬스체크
```
GET http://localhost:8080/api/health
```
