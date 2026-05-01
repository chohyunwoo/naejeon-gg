import { Section, SectionHeader } from '@/components/layout/Section';
import { steps } from '../data/steps';

export function HowItWorksSection() {
  return (
    <Section id="how" background="base">
      <SectionHeader eyebrow="HOW IT WORKS" title="3단계로 끝나는 내전 진행" />
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <li key={step.number} className="relative">
            <div aria-hidden="true" className="mb-4 text-6xl font-bold text-base-300">
              {step.number}
            </div>
            <h3 className="mb-3 text-xl font-semibold text-base-900">
              <span className="sr-only">{step.number}단계: </span>
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-base-600">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
