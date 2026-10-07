import { StatusBadge } from '@/components/StatusBadge';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-bold'>DevFlow Web</h1>
      <StatusBadge status='todo' />
    </main>
  );
}
