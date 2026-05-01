export interface SupportedGame {
  title: string;
  meta: string;
  status: '지원 중';
  features: string[];
}

export const supportedGames: SupportedGame[] = [
  {
    title: '리그 오브 레전드',
    meta: '5v5 · 포지션 5개',
    status: '지원 중',
    features: ['티어 인증 (아이언 ~ 챌린저)', '포지션별 경매', 'BO3 시리즈 지원'],
  },
  {
    title: '오버워치 2',
    meta: '5v5 · 역할군 3종',
    status: '지원 중',
    features: [
      '랭크 인증 (브론즈 ~ 그랜드마스터)',
      '역할군별 경매 (탱/딜/힐)',
      '단판 / 다전제 모두 지원',
    ],
  },
];

export const upcomingGamesText = '발로란트, 배틀그라운드';
