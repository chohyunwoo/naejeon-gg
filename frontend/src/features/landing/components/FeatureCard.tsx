import { cva } from 'class-variance-authority';
import type { Feature, FeatureColor } from '../data/features';
import { cn } from '@/lib/utils';

const iconBoxVariants = cva('mb-4 flex h-10 w-10 items-center justify-center rounded-lg border', {
  variants: {
    color: {
      brand: 'border-brand-100 bg-brand-50 text-brand-600',
      cyan: 'border-cyan-100 bg-cyan-50 text-cyan-600',
      emerald: 'border-emerald-100 bg-emerald-50 text-emerald-600',
      amber: 'border-amber-100 bg-amber-50 text-amber-600',
      pink: 'border-pink-100 bg-pink-50 text-pink-600',
      blue: 'border-blue-100 bg-blue-50 text-blue-600',
    } satisfies Record<FeatureColor, string>,
  },
});

interface FeatureCardProps {
  feature: Feature;
  className?: string;
}

export function FeatureCard({ feature, className }: FeatureCardProps) {
  const Icon = feature.icon;
  return (
    <article
      className={cn('card-hover rounded-xl border border-base-200 bg-base-50 p-6', className)}
    >
      <div className={iconBoxVariants({ color: feature.color })} aria-hidden="true">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-base-900">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-base-600">{feature.description}</p>
    </article>
  );
}
