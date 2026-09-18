import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FeatureCard } from './FeatureCard';

const FEATURE = {
  title: 'REST API',
  summary: 'Django 5 and Django REST Framework, deployed and reachable.',
  detail: 'Liveness and readiness probes, contract tests on every push.',
  href: 'https://github.com/OwlGuild/devflow-api',
  linkLabel: 'devflow-api',
};

describe('FeatureCard', () => {
  it('renders every part of the feature', () => {
    render(<FeatureCard {...FEATURE} />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'REST API' }),
    ).toBeInTheDocument();
    expect(screen.getByText(FEATURE.summary)).toBeInTheDocument();
    expect(screen.getByText(FEATURE.detail)).toBeInTheDocument();
  });

  it('links the feature to its repository', () => {
    render(<FeatureCard {...FEATURE} />);
    const link = screen.getByRole('link', { name: 'devflow-api →' });
    expect(link).toHaveAttribute('href', FEATURE.href);
  });
});
