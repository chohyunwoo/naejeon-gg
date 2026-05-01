import { Section, SectionHeader } from '@/components/layout/Section';
import { features } from '../data/features';
import { FeatureCard } from './FeatureCard';

export function FeaturesSection() {
  return (
    <Section id="features" background="muted">
      <SectionHeader
        eyebrow="FEATURES"
        title={
          <>
            팀 짜기부터 결과 확정까지,
            <br />
            <span className="text-base-500">필요한 모든 것</span>
          </>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </Section>
  );
}
