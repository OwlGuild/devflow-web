export type Feature = {
  title: string;
  summary: string;
  detail: string;
  href: string;
  linkLabel: string;
};

export function FeatureCard({ title, summary, detail, href, linkLabel }: Feature) {
  return (
    <article className='flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5'>
      <h3 className='font-semibold text-slate-900'>{title}</h3>
      <p className='text-sm text-slate-600'>{summary}</p>
      <p className='text-sm text-slate-500'>{detail}</p>
      <a
        className='mt-auto pt-2 text-sm font-medium text-slate-900 underline-offset-4 hover:underline'
        href={href}
      >
        {linkLabel} →
      </a>
    </article>
  );
}
