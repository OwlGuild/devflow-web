import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renders the product heading and tagline', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'DevFlow' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/task management built in public/i),
    ).toBeInTheDocument();
  });

  it('links to the repository and the live API', () => {
    render(<Home />);
    expect(
      screen.getByRole('link', { name: 'View the source' }),
    ).toHaveAttribute('href', 'https://github.com/OwlGuild');
    expect(
      screen.getByRole('link', { name: 'Open the API' }),
    ).toHaveAttribute(
      'href',
      'https://devflow-api-jtmi.onrender.com/health/ready/',
    );
  });

  it('lists the four shipped building blocks', () => {
    render(<Home />);
    for (const title of ['REST API', 'Realtime layer', 'Vector search', 'Quality gates']) {
      expect(
        screen.getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument();
    }
  });

  it('shows the live status probe', () => {
    render(<Home />);
    expect(screen.getByTestId('live-status')).toBeInTheDocument();
  });

  it('renders the board preview with all three status pills', () => {
    render(<Home />);
    expect(screen.getByTestId('board-preview')).toBeInTheDocument();
    const badges = screen.getAllByTestId('status-badge');
    expect(badges).toHaveLength(3);
    expect(badges.map((b) => b.textContent)).toEqual([
      'To do',
      'In progress',
      'Done',
    ]);
  });

  it('shows the run instructions', () => {
    render(<Home />);
    expect(screen.getByText(/npm run dev/)).toBeInTheDocument();
    expect(screen.getByText(/npm test/)).toBeInTheDocument();
  });
});
