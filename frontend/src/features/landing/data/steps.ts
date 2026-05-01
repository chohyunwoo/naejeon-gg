export interface Step {
  number: string;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    number: '01',
    title: '방 만들기',
    description:
      '게임을 선택하고 방을 생성. 일반 방 또는 스트리머 방으로 운영. 초대 코드로 참가자 모집.',
  },
  {
    number: '02',
    title: '팀 구성하기',
    description: '경매로 팀을 짜거나, 자동 매칭으로 빠르게 진행. 모드는 방장이 선택.',
  },
  {
    number: '03',
    title: '게임하고 결과 신고',
    description:
      '외부에서 게임 진행 후 팀장이 결과 신고. 자동으로 포인트 지급, 매치 히스토리 기록.',
  },
];
