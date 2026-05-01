import { ArrowRight } from 'lucide-react';

const heroStats = [
  { label: '진행 상태', value: '곧 런칭' },
  { label: '지원 게임', value: '롤 + OW2' },
  { label: '운영 방식', value: '1인 + AI' },
];

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-bg relative overflow-hidden pb-20 pt-32"
    >
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-200 bg-base-50 px-3 py-1 text-xs text-base-600 shadow-sm"
            role="status"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
            />
            롤 · 오버워치 지원 중
          </div>
          <h1
            id="hero-heading"
            className="mb-6 text-5xl font-bold tracking-tight text-base-900 md:text-6xl"
          >
            내전을 <span className="gradient-text">제대로</span> 즐기는
            <br />
            가장 쉬운 방법
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-base-600">
            경매로 팀을 짜고, 자동으로 매칭하고, 결과까지 한번에.
            <br />
            스트리머와 시청자를 위한 내전 진행 도구.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-base-900 px-6 py-3 font-medium text-base-50 shadow-sm transition-colors hover:bg-base-800 sm:w-auto"
            >
              무료로 시작하기
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#how"
              className="w-full rounded-lg border border-base-200 bg-base-50 px-6 py-3 font-medium text-base-700 transition-colors hover:bg-base-100 sm:w-auto"
            >
              어떻게 작동하나요?
            </a>
          </div>

          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dd className="gradient-text text-2xl font-bold md:text-3xl">{stat.value}</dd>
                <dt className="mt-1 text-sm text-base-500">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
