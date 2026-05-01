import {
  Bell,
  Gavel,
  History,
  ShieldCheck,
  Shuffle,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export type FeatureColor = 'brand' | 'cyan' | 'emerald' | 'amber' | 'pink' | 'blue';

export interface Feature {
  icon: LucideIcon;
  color: FeatureColor;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Gavel,
    color: 'brand',
    title: '실시간 경매',
    description:
      '영국식 경매로 팀장이 직접 선수를 입찰. 20초 카운트다운, 시간 리셋, 패스 시스템까지.',
  },
  {
    icon: Shuffle,
    color: 'cyan',
    title: '자동 팀 배정',
    description: '경매가 부담스럽다면? 포지션 균형을 맞춘 자동 매칭으로 빠르게 시작.',
  },
  {
    icon: ShieldCheck,
    color: 'emerald',
    title: '공정한 결과 확정',
    description: '양 팀 팀장이 결과 신고. 분쟁 발생 시 관리자가 검토. BO3, 무효판도 깔끔하게.',
  },
  {
    icon: History,
    color: 'amber',
    title: '매치 히스토리',
    description: '모든 내전 기록을 마이페이지에서 한눈에. 팀 구성, 결과, 획득 포인트까지.',
  },
  {
    icon: Sparkles,
    color: 'pink',
    title: '꾸미기 시스템',
    description: '매치를 통해 포인트 획득. 미니게임, 가챠, 아이템 구매로 프로필 꾸미기.',
  },
  {
    icon: Bell,
    color: 'blue',
    title: '실시간 알림',
    description: '경매 시작, 입찰 결과, 매치 종료까지. WebSocket 기반 실시간 알림.',
  },
];
