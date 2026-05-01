# 백엔드 작업 프롬프트 템플릿

> Spring Boot 코드 작성/수정 시 사용할 표준 프롬프트. 작업 종류별로 정리.

## 사용 방식

1. 작업 종류에 맞는 템플릿 선택
2. `[대괄호]` 부분을 실제 내용으로 교체
3. Claude Code에 입력

## 공통 프림붙이기

모든 수정 작업 프롬프트 마지막에 다음 포함:

```
[제약조건]
- 기존 로직은 절대 변경하지 마
- 명시한 파일·함수·라인만 수정해
- CLAUDE.md의 코딩 컨벤션 따르기
- 테스트 먼저 작성 (TDD 영역인 경우)
- 수정 후 제안 사항이 있으면 알려줘
```

---

## 1. 분석 프롬프트 (수정 전 필수)

```
[작업영역: auth/room/auction/automatch/match/point]
[대상파일: backend/src/main/java/com/naejeon/[영역]/...]

다음을 분석해줘:

1. 현재 구조 (파일과 클래스 구성)
2. 핵심 메서드와 책임
3. 사용하는 의존성
4. 테스트 커버리지 현황

코드 수정은 하지 말고, 분석 결과만 리포트해줘.
```

---

## 2. 신규 기능 구현 프롬프트

```
[작업영역: auth/room/auction/automatch/match/point]
[기능명: 예) 이메일 인증 코드 발송]

구현 요청 사항:

1. 관련 노션 문서: [노션 링크]
2. 별도 설계 결정 사항:
   - [결정 1]
   - [결정 2]
3. API 명세 (있다면):
   - HTTP 메서드 + 경로
   - 요청·응답 구조
4. DB 스키마 (있다면):
   - 관련 테이블·컬럼

구현 제약조건:

- CLAUDE.md의 구조 (Controller → Service → Repository) 따르기
- DTO·Domain·Entity 분리
- 예외 처리: BusinessException + ErrorCode 사용
- 검증: @Valid + Jakarta Validation
- 테스트 먼저 작성 (TDD 영역인 경우):
   - 단위 테스트 (Service 레벨)
   - 통합 테스트 (TestContainers)
- 로깅: traceId 포함, 민감 정보 마스킹
- API 응답: ApiResponse<T> 포맷 통일

구현 순서:

1. (TDD이면) 실패하는 테스트를 먼저
2. Domain Entity
3. Repository
4. Service
5. Controller
6. DTO
7. 테스트 통과 확인

구현 후 다음을 알려줘:
- 생성·변경된 파일 목록
- 추가 고려 필요한 사항 (의문점·엣지 케이스)
```

---

## 3. 버그 수정 프롬프트

```
[작업영역: auth/room/auction/automatch/match/point]
[파일: backend/src/main/java/com/naejeon/[영역]/[파일]]
[함수: [함수명]]

증상:
[증상 구체적으로 설명]

재현 방법:
[단계별 재현 방법]

기대 동작:
[잘 동작하면 나와야 하는 결과]

에러 로그 (있으면):
[로그 첨부]

수정 제약:

- 기존 로직은 절대 변경하지 마 (버그 수정에 직접 관련된 부분만)
- 버그 재현 테스트 먼저 작성
- 테스트가 실패하는 것을 확인한 후 코드 수정
- 테스트 성공 확인

분석 먼저 수행한 후 원인과 해결 방향 레포트 → 승인 후 수정 진행.
```

---

## 4. 리팩토링 프롬프트

```
[작업영역: auth/room/auction/automatch/match/point]
[대상: backend/src/main/java/com/naejeon/[영역]/...]

리팩토링 이유:
[왜 리팩토링이 필요한지]

제약조건:

- 기능적 일관성 유지 (기존 API 시그니처 변경 금지)
- 기존 테스트 전체 통과해야 함
- 한번에 너무 많은 변경 금지 (작은 단위로)
- CLAUDE.md 원칙 준수

을다음서판:

1. 먼저 현재 구조를 분석하고 리팩토링 계획을 레포트
2. 승인 후 작은 단계로 진행
3. 각 단계마다 테스트 실행
```

---

## 5. 테스트 작성 프롬프트

```
[작업영역: auth/room/auction/automatch/match/point]
[대상 클래스: [클래스명]]
[대상 메서드: [메서드명]]

테스트 종류: 단위 테스트 / 통합 테스트

테스트 케이스:

1. 정상 케이스: [설명]
2. 에지 케이스: [설명]
3. 예외 케이스: [설명]

제약조건:

- JUnit 5 + AssertJ + Mockito
- 통합 테스트면 TestContainers (PostgreSQL + Redis)
- Given-When-Then 구조
- 한 테스트 = 한 검증
- 테스트명: 한국어 (예: `이메일이_이미_존재하면_가입_실패한다`)
- Mock은 외부 의존성만 (Repository, 외부 API)
- 도메인 로직은 실제 객체
```

---

## 6. WebSocket 관련 작업 프롬프트 (경매 영역)

```
[작업영역: auction]
[메시지타입: AUCTION_STARTED / BID_PLACED / ITEM_SOLD 등]

구현 요청:

1. WebSocket 메시지 구조
2. 클라이언트 구독 경로
3. 서버 처리 로직
4. broadcast 대상

관련 노션:
WebSocket 메시지 명세: notion.so/352eaf1930698148b1c0fa55f7b892cb

제약조건:

- STOMP over WebSocket
- 채널 구조: /topic/room/{roomId}/auction
- 동시 입찰 처리: 방 단위 단일 스레드 + 큐
- 메시지 포맷: { type, timestamp, data }
- 카운트다운: 시작 시각만 전송 (클라이언트가 계산)
- 테스트: WebSocketMessageBrokerConfigurer 구성 포함
```

---

## 7. DB 스키마 마이그레이션 프롬프트

```
[작업: 신규 테이블 / 컬럼 추가 / 인덱스 추가]

마이그레이션 명: VN__설명.sql
[예: V12__add_user_game_profiles.sql]

요청 사항:

[SQL DDL 내용 설명]

관련 노션: [관련 DB 설계 페이지 링크]

제약조건:

- snake_case, 복수형 테이블, id PK, xxx_id FK
- TIMESTAMPTZ 사용
- ENUM 대신 VARCHAR + CHECK
- 적절한 인덱스 추가
- 명확한 설명 (-- 컴트 추가)
- Flyway 버전 충돌 확인 (이전 V 번호 확인)
- 롤백 스크립트도 함께 생각해서 명시 (필요 시)
```

---

## 8. Spring Security 설정 프롬프트

```
[작업: 인증/인가 관련 설정]
[대상파일: backend/src/main/java/com/naejeon/common/config/WebSecurityConfig.java]

요청:
[추가수정할 내용]

제약조건:

- Spring Security 6 기반 (Spring Boot 3.x)
- JWT 기반 (세션 미사용)
- Stateless
- CSRF: API는 disable, WebSocket은 특별 처리
- CORS 설정 포함
- 인가가 필요한 경로·메서드 명시
- @PreAuthorize 사용 가능
- 테스트에서는 @WithMockUser 사용

추가:

- JWT 필터 프로축셔 프로도
- AuthenticationProvider 구현
```

---

## 9. 멀티 도메인 수정 프롬프트 (교차 점검)

```
[주월영역: A → 주 잘 B]
[변경 내용: 설명]

교차 점검 필요:

1. 영역 A에서 변경되는 사항이 영역 B에 미치는 영향
2. 공유하는 코드/도메인 이벤트
3. 트랜잭션 경계

을다음서판:

1. 먼저 두 영역의 현 상태·의존성 분석
2. 변경 사항이 주는 영향 정리
3. 추가 수정 필요한 다른 영역 알려주기
4. 승인 후 수정 진행
```

---

## 프롬프트 설계 원칙 (참고)

### 도메인 컨텍스트 명시

항상 안년도 영역별 이름 명시:
- auth (인증)
- room (방 관리)
- auction (경매)
- automatch (자동 매칭)
- match (결과 확정)
- point (포인트)

### 단계적 접근

한 프롬프트에 여러 작업 넘겨승면 X. 한 번에 하나씩.

### 의도 명시

"이 코드는 왜 있는가" 명시.

```
이 메서드는 타임아웃 정책 적용을 위해 필요.
```

## 관련 링크

- CLAUDE.md (이 파일 옆)
- FRONTEND.md (이 파일 옆)
- 노션 AI 협업 가이드: notion.so/352eaf19306981008d9ccab63a2fceab
