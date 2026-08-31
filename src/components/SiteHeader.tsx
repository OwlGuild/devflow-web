import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className='border-b border-slate-200'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-6 py-4'>
        <Link
          href='/'
          className='flex items-center gap-2 font-semibold text-slate-900'
        >
          <span className='inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-sm font-bold text-white'>
            D
          </span>
          DevFlow
        </Link>
        <nav className='flex items-center gap-5 text-sm text-slate-600'>
          <a className='hover:text-slate-900' href='https://github.com/OwlGuild'>
            GitHub
          </a>
          <a
            className='hover:text-slate-900'
            href='https://github.com/OwlGuild/devflow-api'
          >
            API
          </a>
          <a
            className='hover:text-slate-900'
            href='https://github.com/OwlGuild/devflow-qa'
          >
            QA
          </a>
        </nav>
      </div>
    </header>
  );
}
