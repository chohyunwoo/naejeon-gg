import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { SupportedGame } from '../data/games';
import { cn } from '@/lib/utils';

interface GameCardProps {
  game: SupportedGame;
  className?: string;
}

export function GameCard({ game, className }: GameCardProps) {
  return (
    <article
      className={cn('card-hover rounded-xl border border-base-200 bg-base-50 p-8', className)}
    >
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="mb-1 text-2xl font-bold text-base-900">{game.title}</h3>
          <p className="text-sm text-base-500">{game.meta}</p>
        </div>
        <Badge variant="success">{game.status}</Badge>
      </header>
      <ul className="space-y-2 text-sm text-base-600">
        {game.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
