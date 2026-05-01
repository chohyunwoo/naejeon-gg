import { BrandMark } from '@/components/BrandMark';

const footerLinks = [
  { href: '#', label: '이용약관' },
  { href: '#', label: '개인정보처리방침' },
  { href: '#', label: '문의' },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-base-200/60 bg-base-100/60 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <BrandMark size="sm" />
            <span className="text-sm text-base-500">· 내전을 즐기기 좋게 만드는 서비스</span>
          </div>
          <ul className="flex items-center gap-6 text-sm text-base-500">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-base-900">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 border-t border-base-200/60 pt-8 text-xs text-base-400">
          © 2026 내전.gg. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
