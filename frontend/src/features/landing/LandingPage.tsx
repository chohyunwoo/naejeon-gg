import { LandingNav } from './components/LandingNav';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { GamesSection } from './components/GamesSection';
import { CtaSection } from './components/CtaSection';
import { LandingFooter } from './components/LandingFooter';

export function LandingPage() {
  return (
    <>
      <LandingNav />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <GamesSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </>
  );
}
