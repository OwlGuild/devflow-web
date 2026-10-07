export type Status = 'todo' | 'in_progress' | 'done';

const STYLES: Record<Status, string> = {
  todo: 'bg-slate-100 text-slate-700',
  in_progress: 'bg-amber-100 text-amber-800',
  done: 'bg-emerald-100 text-emerald-800',
};

const LABELS: Record<Status, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      data-testid="status-badge"
      className={`rounded-full px-3 py-1 text-sm font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
