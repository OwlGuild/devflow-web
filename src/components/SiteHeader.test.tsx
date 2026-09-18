import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from './SiteHeader';

describe('SiteHeader', () => {
  it('links the logo back to the home route', () => {
    render(<SiteHeader />);
    expect(screen.getByRole('link', { name: /DevFlow/ })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('exposes the three navigation destinations', () => {
    render(<SiteHeader />);
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/OwlGuild',
    );
    expect(screen.getByRole('link', { name: 'API' })).toHaveAttribute(
      'href',
      'https://github.com/OwlGuild/devflow-api',
    );
    expect(screen.getByRole('link', { name: 'QA' })).toHaveAttribute(
      'href',
      'https://github.com/OwlGuild/devflow-qa',
    );
  });
});
