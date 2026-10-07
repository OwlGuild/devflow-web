'use client';

import { useEffect, useState } from 'react';

type State = 'loading' | 'ok' | 'down';

const LABELS: Record<State, string> = {
  loading: 'Checking API…',
  ok: 'API live · database up',
  down: 'API unreachable',
};

const DOT: Record<State, string> = {
  loading: 'bg-amber-400',
  ok: 'bg-emerald-500',
  down: 'bg-rose-500',
};

const PROBE_TIMEOUT_MS = 30_000;

export function LiveStatus({ apiUrl }: { apiUrl: string }) {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    if (!apiUrl) {
      setState('down');
      return;
    }

    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
    const base = apiUrl.replace(/\/+$/, '');

    fetch(`${base}/health/ready/`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((payload) => {
        if (active) setState(payload?.status === 'ok' ? 'ok' : 'down');
      })
      .catch(() => {
        if (active) setState('down');
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [apiUrl]);

  return (
    <div
      data-testid='live-status'
      data-state={state}
      className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700'
    >
      <span className={`h-2 w-2 rounded-full ${DOT[state]}`} aria-hidden />
      {LABELS[state]}
    </div>
  );
}
