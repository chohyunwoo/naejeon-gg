import { BrandMark } from '@/components/BrandMark';

const navLinks = [
  { href: '#features', label: '기능' },
  { href: '#how', label: '이용 방법' },
  { href: '#games', label: '지원 게임' },
];

export function LandingNav() {
  return (
    <nav
      aria-label="주요 메뉴"
      className="fixed inset-x-0 top-0 z-50 border-b border-base-200/80 bg-base-50/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center" aria-label="내전.gg 홈">
            <BrandMark size="md" />
          </a>
          <div className="hidden items-center gap-6 text-sm text-base-600 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-base-900">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-sm text-base-700 transition-colors hover:text-base-900 sm:block"
          >
            로그인
          </a>
          <a
            href="#"
            className="rounded-lg bg-base-900 px-4 py-2 text-sm font-medium text-base-50 shadow-sm transition-colors hover:bg-base-800"
          >
            시작하기
          </a>
        </div>
      </div>
    </nav>
  );
}
