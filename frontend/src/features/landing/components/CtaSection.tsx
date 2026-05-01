import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="scroll-mt-16 border-t border-base-200/60 bg-base-50 py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-base-200 bg-gradient-to-br from-brand-50 via-base-50 to-cyan-50 p-12 text-center shadow-sm">
          <div className="relative">
            <h2 id="cta-heading" className="mb-4 text-3xl font-bold text-base-900 md:text-4xl">
              지금 바로 시작해보세요
            </h2>
            <p className="mb-8 text-base-600">
              가입은 무료. 친구들과 첫 내전을 시작하기까지 5분이면 충분합니다.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-base-900 px-6 py-3 font-medium text-base-50 shadow-sm transition-colors hover:bg-base-800"
            >
              무료로 시작하기
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
