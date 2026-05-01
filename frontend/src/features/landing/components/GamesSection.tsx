import { Section, SectionHeader } from '@/components/layout/Section';
import { supportedGames, upcomingGamesText } from '../data/games';
import { GameCard } from './GameCard';

export function GamesSection() {
  return (
    <Section id="games" background="muted">
      <SectionHeader
        eyebrow="SUPPORTED GAMES"
        title="지원 게임"
        description="리그 오브 레전드와 오버워치로 시작합니다. 더 많은 게임이 곧 추가됩니다."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {supportedGames.map((game) => (
          <GameCard key={game.title} game={game} />
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-dashed border-base-300 bg-base-50 p-6 text-center">
        <p className="text-sm text-base-600">
          <span className="font-medium text-base-900">{upcomingGamesText}</span> 등 추가 게임 준비
          중입니다
        </p>
      </div>
    </Section>
  );
}
