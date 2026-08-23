import { StatusBadge, type Status } from './StatusBadge';

type Column = {
  title: string;
  status: Status;
  tasks: string[];
};

const COLUMNS: Column[] = [
  {
    title: 'Backlog',
    status: 'todo',
    tasks: ['Drag targets for the board', 'Persian RTL audit'],
  },
  {
    title: 'In progress',
    status: 'in_progress',
    tasks: ['Optimistic mutations with rollback'],
  },
  {
    title: 'Shipped',
    status: 'done',
    tasks: ['Health and readiness endpoints', 'CI, Docker builds, smoke checks'],
  },
];

export function BoardPreview() {
  return (
    <div className='grid gap-4 md:grid-cols-3' data-testid='board-preview'>
      {COLUMNS.map((column) => (
        <section
          key={column.title}
          className='rounded-xl border border-slate-200 bg-slate-50 p-4'
        >
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-sm font-semibold text-slate-700'>{column.title}</h3>
            <StatusBadge status={column.status} />
          </div>
          <ul className='space-y-2'>
            {column.tasks.map((task) => (
              <li
                key={task}
                className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700'
              >
                {task}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
