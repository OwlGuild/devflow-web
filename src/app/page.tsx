import { BoardPreview } from '@/components/BoardPreview';
import { FeatureCard, type Feature } from '@/components/FeatureCard';
import { LiveStatus } from '@/components/LiveStatus';
import { SiteHeader } from '@/components/SiteHeader';

const FEATURES: Feature[] = [
  {
    title: 'REST API',
    summary: 'Django 5 and Django REST Framework, deployed and reachable.',
    detail: 'Liveness and readiness probes, contract tests on every push.',
    href: 'https://github.com/OwlGuild/devflow-api',
    linkLabel: 'devflow-api',
  },
  {
    title: 'Realtime layer',
    summary: 'A WebSocket service that pushes board changes as typed frames.',
    detail: 'Greetings, echo envelopes and explicit error frames, all under test.',
    href: 'https://github.com/OwlGuild/devflow-realtime',
    linkLabel: 'devflow-realtime',
  },
  {
    title: 'Vector search',
    summary: 'PostgreSQL with pgvector for retrieval over project documents.',
    detail: 'Paragraph chunking and nearest-neighbour ranking, no extra database.',
    href: 'https://github.com/OwlGuild/docmind',
    linkLabel: 'docmind',
  },
  {
    title: 'Quality gates',
    summary: 'Contract, unit and load checks that fail the build, not production.',
    detail: 'pytest, vitest, k6, Docker image builds and live smoke checks.',
    href: 'https://github.com/OwlGuild/devflow-qa',
    linkLabel: 'devflow-qa',
  },
];

const STATS = [
  { value: '6', label: 'repositories' },
  { value: '4', label: 'live services' },
  { value: 'Frankfurt', label: 'deploy region' },
  { value: 'Every push', label: 'runs CI' },
];

export default function Home() {
  const apiUrl = process.env.DEVFLOW_API_URL ?? '';

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      <SiteHeader />

      <main>
        <section className='mx-auto max-w-5xl px-6 py-16'>
          <p className='mb-3 text-sm font-medium uppercase tracking-wide text-slate-500'>
            Open source · OwlGuild
          </p>
          <h1 className='text-4xl font-bold sm:text-5xl'>DevFlow</h1>
          <p className='mt-4 max-w-2xl text-lg text-slate-600'>
            Team task management built in public: a REST API, a realtime
            WebSocket layer, vector search and the quality gates that keep all
            three honest.
          </p>

          <div className='mt-6 flex flex-wrap items-center gap-3'>
            <LiveStatus apiUrl={apiUrl} />
            <a
              className='rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700'
              href='https://github.com/OwlGuild'
            >
              View the source
            </a>
            <a
              className='rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100'
              href='https://devflow-api-jtmi.onrender.com/health/ready/'
            >
              Open the API
            </a>
          </div>

          <dl className='mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4'>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className='text-sm text-slate-500'>{stat.label}</dt>
                <dd className='text-xl font-semibold'>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className='mx-auto max-w-5xl px-6 pb-16'>
          <h2 className='mb-6 text-xl font-semibold'>What ships today</h2>
          <div className='grid gap-4 md:grid-cols-2'>
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <section className='mx-auto max-w-5xl px-6 pb-16'>
          <h2 className='mb-2 text-xl font-semibold'>The board, as it is planned</h2>
          <p className='mb-6 text-sm text-slate-600'>
            Columns and status pills are real components, rendered here so the
            design system and the backlog tell the same story.
          </p>
          <BoardPreview />
        </section>

        <section className='mx-auto max-w-5xl px-6 pb-16'>
          <h2 className='mb-4 text-xl font-semibold'>Run it yourself</h2>
          <pre className='overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-100'>
            {`git clone https://github.com/OwlGuild/devflow-web.git
cd devflow-web
npm install
npm run dev      # http://localhost:3000
npm test         # vitest run`}
          </pre>
        </section>
      </main>

      <footer className='border-t border-slate-200'>
        <div className='mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-sm text-slate-500'>
          <span>Built by OwlGuild · MIT licensed</span>
          <span className='flex gap-4'>
            <a className='hover:text-slate-900' href='https://github.com/OwlGuild'>
              GitHub
            </a>
            <a
              className='hover:text-slate-900'
              href='https://github.com/OwlGuild/devflow-web'
            >
              This repository
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
