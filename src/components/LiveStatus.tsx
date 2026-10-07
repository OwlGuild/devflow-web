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

export function LiveStatus() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    let active = true;
    const base = process.env.NEXT_PUBLIC_API_URL;
    if (!base) {
      setState('down');
      return;
    }
    fetch(`${base}/health/ready/`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((payload) => {
        if (active) setState(payload?.status === 'ok' ? 'ok' : 'down');
      })
      .catch(() => {
        if (active) setState('down');
      });
    return () => {
      active = false;
    };
  }, []);

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
