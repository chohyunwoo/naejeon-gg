import { useHealthCheck } from '@/hooks/useHealthCheck';

export function PlaceholderPage() {
  const isDev = import.meta.env.DEV;
  const health = useHealthCheck();

  return (
    <main className="relative min-h-screen overflow-hidden bg-base-50">
      <div className="absolute inset-0 hero-bg" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg gradient-icon shadow-sm">
          <span className="text-base-50 text-lg font-bold">내</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-base-900">
          <span className="gradient-text">내전.gg</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-base-600">
          내전을 즐기기 좋게 만드는 서비스.
          <br />
          Step 2에서 메인 페이지가 들어옵니다.
        </p>

        {isDev && (
          <section aria-label="헬스체크 결과 (개발 모드)" className="mt-12 w-full max-w-md">
            <HealthCard
              status={health.isPending ? 'pending' : health.isError ? 'error' : 'ok'}
              data={health.data}
              error={health.error}
            />
          </section>
        )}
      </div>
    </main>
  );
}

interface HealthCardProps {
  status: 'pending' | 'ok' | 'error';
  data: { status: string; service: string; message: string } | undefined;
  error: Error | null;
}

function HealthCard({ status, data, error }: HealthCardProps) {
  return (
    <div className="rounded-xl border border-base-200 bg-base-50 p-6 text-left shadow-sm card-hover">
      <div className="flex items-center gap-2">
        <StatusDot status={status} />
        <h2 className="text-sm font-semibold text-base-700">백엔드 헬스체크</h2>
        <span className="ml-auto text-xs text-base-400">/api/health</span>
      </div>

      {status === 'pending' && <p className="mt-3 text-sm text-base-500">확인 중...</p>}

      {status === 'ok' && data && (
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="text-base-500">status</dt>
            <dd className="text-base-700 font-medium">{data.status}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-base-500">service</dt>
            <dd className="text-base-700">{data.service}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-base-500">message</dt>
            <dd className="text-base-700">{data.message}</dd>
          </div>
        </dl>
      )}

      {status === 'error' && (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-base-700">
            백엔드 연결 실패. 백엔드가 실행 중인지 확인하세요.
          </p>
          <p className="text-xs text-base-500 font-mono">{error?.message ?? 'Unknown error'}</p>
        </div>
      )}
    </div>
  );
}

function StatusDot({ status }: { status: 'pending' | 'ok' | 'error' }) {
  const color =
    status === 'ok' ? 'bg-emerald-500' : status === 'error' ? 'bg-red-500' : 'bg-base-300';
  return <span aria-hidden="true" className={`inline-block h-2 w-2 rounded-full ${color}`} />;
}
