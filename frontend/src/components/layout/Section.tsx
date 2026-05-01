import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const sectionVariants = cva('border-t border-base-200/60', {
  variants: {
    background: {
      base: 'bg-base-50',
      muted: 'bg-base-100/60',
      none: '',
    },
    padding: {
      default: 'py-24',
      sm: 'py-20',
    },
  },
  defaultVariants: {
    background: 'base',
    padding: 'default',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  containerClassName?: string;
  /** Anchor 스크롤 시 Nav 높이만큼 오프셋. 기본 활성. */
  scrollOffset?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { className, containerClassName, background, padding, scrollOffset = true, children, ...props },
    ref
  ) => (
    <section
      ref={ref}
      className={cn(
        sectionVariants({ background, padding }),
        scrollOffset && 'scroll-mt-16',
        className
      )}
      {...props}
    >
      <div className={cn('mx-auto max-w-7xl px-6', containerClassName)}>{children}</div>
    </section>
  )
);
Section.displayName = 'Section';

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-16 max-w-2xl', className)}>
      {eyebrow && <div className="mb-3 text-sm font-semibold text-brand-600">{eyebrow}</div>}
      <h2 className="mb-4 text-3xl font-bold text-base-900 md:text-4xl">{title}</h2>
      {description && <p className="text-base-600">{description}</p>}
    </div>
  );
}

export { Section, SectionHeader };
