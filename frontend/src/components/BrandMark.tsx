import { Zap } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconBoxVariants = cva('flex items-center justify-center rounded-lg gradient-icon shadow-sm', {
  variants: {
    size: {
      sm: 'h-7 w-7',
      md: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const iconVariants = cva('text-white', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const labelVariants = cva('font-semibold text-base-900', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface BrandMarkProps extends VariantProps<typeof iconBoxVariants> {
  className?: string;
  /** 라벨 표시 여부 (기본 true) */
  showLabel?: boolean;
}

export function BrandMark({ size, className, showLabel = true }: BrandMarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className={iconBoxVariants({ size })} aria-hidden="true">
        <Zap className={iconVariants({ size })} strokeWidth={2} />
      </span>
      {showLabel && <span className={labelVariants({ size })}>내전.gg</span>}
    </span>
  );
}
